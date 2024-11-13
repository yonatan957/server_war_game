import { Socket } from "socket.io";
import { io } from "../app";
import { IAttack } from "../models/Attack";
import JWT from 'jsonwebtoken'
import { IUser } from "../models/User";
import { tokenPayload } from "../DTO/tokenPayload";
import { createAttack } from "../services/attack";

export const handleSocketConnection = (client:Socket)=>{
    console.log(client.id)
    io.on('launch', (data:{attack:IAttack, token:string})=>{
        try {
            const user:tokenPayload = verifyAttack(data.token)
            if (user.user_id != data.attack.id_attacker) {throw new Error('you are Hacker 😱')}
            const createdAttack = createAttack(data.attack)
            if (!createdAttack) {throw new Error('attack not created')}
            io.emit('launched', createdAttack)
        } catch (error) {
            console.log((error as Error).message)
        }
    })
}

const verifyAttack = (token:string)=>{
    if(!token) throw new Error('token must be provided')
    const payload = JWT.verify(token, process.env.SECRET_JWT!) as tokenPayload;
    if(!payload){throw new Error('you are Hacker 😱')}
    return payload
}