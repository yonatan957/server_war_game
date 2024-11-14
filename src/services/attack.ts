import Attack, { IAttack } from "../models/Attack";
import User from "../models/User";
import missles from '../Data/missiles.json'

export const createAttack = async (attack:IAttack) => {
    const user = await User.findById(attack.id_attacker)
    if(!user) throw new Error('user not found')
    const weapon = user.resources.find(resource => resource.name === attack.name)
    if(!weapon) throw new Error('weapon not found')
    if(weapon!.amount < 1) throw new Error('not enough resources')
    user.resources.map(resource => {
        if(resource.name === attack.name) resource.amount -= 1
        return resource
    })
    await user.save()
    attack.tymeToHit = missles.find(missle => missle.name === attack.name)!.speed
    attack.intercepted = false
    attack.organization = user.organization
    const newAttack = await Attack.create(attack)
    return newAttack
}
export const interceptAttack = async (interceptor:string, attack:string, user_id:string, time:number) => {
    const user = await User.findById(user_id)
    if(!user) throw new Error('user not found')
    const weapon = user.resources.find(resource => resource.name === interceptor)
    if(!weapon) throw new Error('weapon not found')
    if(weapon!.amount < 1) throw new Error('not enough resources')
    const attackToUpdate = await Attack.findById(attack)
    if(!attackToUpdate) throw new Error('attack not found')
    attackToUpdate.intercepted = true
    attackToUpdate.id_intercepted = user_id
    attackToUpdate.tymeToHit = time
    await attackToUpdate.save()
    user.resources.map(resource => {
        if(resource.name === interceptor) resource.amount -= 1
        return resource
    })
    await user.save()
    return {attackToUpdate, timeToItercept:missles.find(m=> m.name == interceptor)?.speed}
}

export const explodeAttack = async (attack:string, user_id:string) => {
    const attackToUpdate = await Attack.findById(attack)
    if(!attackToUpdate) throw new Error('attack not found')
    if(attackToUpdate.id_attacker !== user_id) throw new Error('you are not the attacker');
    if(attackToUpdate.intercepted) return attackToUpdate
    attackToUpdate.id_intercepted = undefined
    attackToUpdate.tymeToHit = 0
    await attackToUpdate.save()
    return attackToUpdate
}

export const getAllService = async () => {
    const attacks = await Attack.find({}).lean()
    if(!attacks) throw new Error('attacks not found')
    return attacks
}

export const getyourAttacksService = async (id:string) => {
    const attacks = await Attack.find({id_attacker:id}).lean()
    if(!attacks) throw new Error('attacks not found')
    return attacks
}

export const getyourThretsServise = async (id:string) => {
    const user = await User.findById(id).lean()
    if(!user) throw new Error('user not found')
    let attacks:IAttack[] = [] 
    if (user.organization === 'IDF - North'){
        attacks = await Attack.find({organization:'Hezbollah'}).lean()
    }
    else if (user.organization === 'IDF - South'){
        attacks = await Attack.find({organization:'Hamas'}).lean()
    }
    else if (['IDF - Center', 'IDF - West Bank'].includes(user.organization)){
        attacks = await Attack.find({}).lean()
    }
    else{
        throw new Error('organization not found')
    }
    if(!attacks) throw new Error('attacks not found')
    return attacks
}