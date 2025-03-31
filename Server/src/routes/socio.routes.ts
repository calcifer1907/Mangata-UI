import { Router } from "express";

const router = Router();
import { authenticate } from "../handles/authMiddleware";
import socioController from "../controllers/socio.controller";

router.get("/commission/:id", authenticate, socioController.sumCommission);

router.get("/getListBanks", authenticate, socioController.getListBanks);

export default router;
