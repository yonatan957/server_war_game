import JWT from "jsonwebtoken";
import { loginDTO } from "../DTO/loginDTO";
import { registerDTO } from "../DTO/registerDTO";
import bcrypt from 'bcrypt'
import User from "../models/user";
import Organization from "../models/organization"

export const loginService = async (loginDTO: loginDTO) => {
};

export const registerService = async (registerDTO:registerDTO) => {
    const organization = await Organization.findOne({name:registerDTO.organization, location:registerDTO.location}).lean()
    if(!organization)throw new Error('organization not found')
    const newUser = new User({
        ...registerDTO,
        password: await bcrypt.hash(registerDTO.password, Number(process.env.HASH)| 10),
        resources: organization.resources,
        budget:organization.budget
    })
    newUser.save()
    return newUser
};