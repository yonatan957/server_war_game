import { Router } from "express";
import { buyWeapon, login, register } from "../routes/users";
import verifyUser from "../middlewares/verifyUser";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.put("/buyWeapon", verifyUser, buyWeapon);

export default router;
