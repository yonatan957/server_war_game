import { Router } from "express";
import { getAll } from "../routes/attacks";
import verifyUser from "../middlewares/verifyUser";

const router = Router();

router.get("/",verifyUser, getAll);

export default router