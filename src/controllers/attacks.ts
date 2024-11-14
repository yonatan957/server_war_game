import { Router } from "express";
import { getAll, getyourAttacks, getyourThrets } from "../routes/attacks";
import verifyUser from "../middlewares/verifyUser";

const router = Router();

router.get("/",verifyUser, getAll);
router.get("/myAttacks",verifyUser, getyourAttacks);
router.get("/myThrets",verifyUser, getyourThrets);

export default router