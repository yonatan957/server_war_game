import { Request, Response } from "express";
import { sidService } from "../services/sid";

export const sid = async (req: Request,res: Response) => {
    try {
      const result = await sidService();
      res.status(200).json(result);
    } catch (error) {
      res.send((error as Error).message);
    }
  };