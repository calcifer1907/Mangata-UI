import { Router } from "express";
import { createOrder, reciveWebhook } from "../controllers/payments.controller";

const router = Router();

router.post("/createOrder", createOrder);

router.get("/success", (req: any, res: any) => res.send("success"));
router.get("/failure", (req: any, res: any) => res.send("failure"));
router.get("/pending", (req: any, res: any) => res.send("pending"));
router.post("/webhook", reciveWebhook);

export default router;
