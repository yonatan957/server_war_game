import { Request, Response } from "express";
import { byeWeaponService, loginService, registerService } from "../services/user";
import { registerDTO } from "../DTO/registerDTO";
import { loginDTO } from "../DTO/loginDTO";
import { byeWeaponDTO } from "../DTO/byeWeapon";

export const login = async (req: Request<any, any, loginDTO>,res: Response) => {
  try {
    const result = await loginService(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({message:(error as Error).message});
  }
};

export const register = async (req: Request<any, any, registerDTO>,res: Response) => {
  try {
    const result = await registerService(req.body);
    res.status(201).json({ message: "success" });
  } catch (error) {
    res.status(400).json({message:(error as Error).message});
  }
};

export const byeWeapon = async (req: Request<any, any, byeWeaponDTO>,res: Response) => {
  try {
    const id = (req as any).user.user_id;
    if(!id) throw new Error('problem with middleware');
    const interceptor = req.body.interceptor
    if(!interceptor) throw new Error('interceptor required')
    const result = await byeWeaponService(id, interceptor);
    res.status(201).json({ message: "success" });
  } catch (error) {
    res.status(400).json({message:(error as Error).message});
  }
}
