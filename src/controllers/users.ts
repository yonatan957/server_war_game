import { Router } from "express";
import { byeWeapon, login, register } from "../routes/users";
import verifyUser from "../middlewares/verifyUser";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.put('byeWeapon', verifyUser, byeWeapon);

export default router;