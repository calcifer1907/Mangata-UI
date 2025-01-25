import { Router } from "express";
import {
  createOrder,
  reciveWebhook,
  createPSEPayment,
  getListBanks,
  getPayment,
} from "../controllers/payments.controller";

const router = Router();

router.post("/createOrder", createOrder);
router.post("/PSEPayment", createPSEPayment);

router.post("/webhook", reciveWebhook);
router.post("/payments", getPayment);

router.get("/success", (req: any, res: any) => res.send("success"));
router.get("/failure", (req: any, res: any) => res.send("failure"));
router.get("/pending", (req: any, res: any) => res.send("pending"));

router.get("/getListBanks", getListBanks);

export default router;
