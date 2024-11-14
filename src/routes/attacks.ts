import { Request, Response } from "express"
import { getAllService } from "../services/attack"

export const getAll = async(req: Request, res: Response)=>{
    try {
        const attacks = await getAllService()
        res.json(attacks)
    } catch (error) {
        res.status(400).json({message:(error as Error).message})
    }    
}