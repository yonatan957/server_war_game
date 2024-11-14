import { Request, Response } from "express"
import { getAllService, getyourAttacksService, getyourThretsServise } from "../services/attack"
import { tokenPayload } from "../DTO/tokenPayload"

export const getAll = async(req: Request, res: Response)=>{
    try {
        const attacks = await getAllService()
        res.json(attacks)
    } catch (error) {
        res.status(400).json({message:(error as Error).message})
    }    
}

export const getyourAttacks = async(req: Request, res: Response)=>{
    try {
        const id = (req as any).user.user_id
        if (!id) throw new Error('problem with middleware')
        const attacks = await getyourAttacksService(id)
        res.json(attacks)
    } catch (error) {
        res.status(400).json({message:(error as Error).message})
    }    
}

export const getyourThrets = async(req: Request, res: Response)=>{
    try {
        const id = (req as any).user.user_id
        if (!id) throw new Error('problem with middleware')
        const attacks = await getyourThretsServise(id)
        res.json(attacks)
    } catch (error) {
        res.status(400).json({message:(error as Error).message})
    }    
}