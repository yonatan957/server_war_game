import JWT from "jsonwebtoken";
import { loginDTO } from "../DTO/loginDTO";
import { registerDTO } from "../DTO/registerDTO";
import bcrypt from 'bcrypt'
import User from "../models/User"
import Organization from "../models/organization"

export const loginService = async (loginDTO: loginDTO) => {
    const user = await User.findOne({userName:loginDTO.userName}).lean()
    if(!user)throw new Error('user not found')
    if (!await bcrypt.compare(loginDTO.password, user.password))throw new Error('password invalid')
    const token = JWT.sign({
        user_id:user._id,
        userName:user.userName
    }, process.env.SECRET_JWT as string, {expiresIn:'10m'} )
    return {...user, token, password:'******'}
};

export const registerService = async (registerDTO:registerDTO) => {
    const organization = await Organization.findOne({name:registerDTO.organization}).lean()
    if(!organization)throw new Error('organization not found')
    const newUser = new User({
        ...registerDTO,
        password: await bcrypt.hash(registerDTO.password, Number(process.env.HASH)| 10),
        resources: organization.resources,
        budget:organization.budget,
        attacker:!organization.name.startsWith('IDF')
    })
    newUser.save()
    return newUser
};