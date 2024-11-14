import { Socket } from "socket.io";
import { io } from "../app";
import { IAttack } from "../models/Attack";
import JWT from 'jsonwebtoken'
import { tokenPayload } from "../DTO/tokenPayload";
import { createAttack, explodeAttack, interceptAttack } from "../services/attack";

export const handleSocketConnection = (client:Socket)=>{
    client.on('launch', async(data:{attack:IAttack, token:string, location:string})=>{
        try {
            if (!["IDF - Center", "IDF - West Bank", "IDF - South", "IDF - North"].includes(data.location.trim())) {throw new Error('you are Hacker 😱')}
            const user:tokenPayload = verifyAttack(data.token)
            if (user.user_id != data.attack.id_attacker) {throw new Error('you are Hacker 😱2')}
            const {newAttack, oranization} = await createAttack(data.attack)
            if (!newAttack) {throw new Error('attack not created')}
            client.emit('launched', newAttack)
            io.to(data.location).emit('launched', newAttack);
        } catch (error) {
            console.log((error as Error).message)
        }
    })
    client.on('goToRoom', (data:{room:string})=>{
        client.join(data.room.trim())
    })
    client.on("intercept", async(data:{interceptor:string, token:string, attack: string,time: number})=>{
        const user:tokenPayload = verifyAttack(data.token)
        const attack = await interceptAttack(data.interceptor, data.attack, user.user_id, data.time)
        io.emit('intercepted', attack)
    })
    client.on("Attack_finished", (data:{attack:string, token:string})=>{
        const user:tokenPayload = verifyAttack(data.token)
        const attackToUpdate = explodeAttack(data.attack, user.user_id)
    })
}


const verifyAttack = (token:string)=>{
    if(!token) throw new Error('token must be provided')
    const payload = JWT.verify(token, process.env.SECRET_JWT!) as tokenPayload;
    if(!payload){throw new Error('you are Hacker 😱1')}
    return payload
}