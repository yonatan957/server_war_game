import Attack, { IAttack } from "../models/Attack";
import User from "../models/User";
import missles from '../Data/missiles.json'

export const createAttack = async (attack:IAttack) => {
    const user = await User.findById(attack.id_attacker).lean()
    if(!user) throw new Error('user not found')
    const weapon = user.resources.find(resource => resource.name === attack.name)
    if(!weapon) throw new Error('weapon not found')
    if(weapon!.amount < 1) throw new Error('not enough resources')
    user.resources.map(resource => {
        if(resource.name === attack.name) resource.amount -= 1
        return resource
    })
    await user.save()
    const newAttack = new Attack(attack)
    newAttack.tymeToHit = missles.find(missle => missle.name === attack.name)!.speed
    await newAttack.save()
    return newAttack
}