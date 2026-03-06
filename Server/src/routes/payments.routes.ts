import { Router } from "express";
import {
  // createOrder,
  // reciveWebhook,
  // createPSEPayment,
  // getListBanks,
  paymentBold,
  webhookBold,
  getOrderIdBold,
  testEmail,
} from "../controllers/payments.controller";

const router = Router();

// router.post("/mercadoPagoCreditCard", createOrder);
// router.post("/PSEPayment", createPSEPayment);
// router.post("/webhook", reciveWebhook);

router.post("/paymentsBold", paymentBold);

router.post("/api/webhook-bold", webhookBold);

router.post("/api/getOrderId", getOrderIdBold);

router.get("/testemail/:key", testEmail);

router.get("/success", (req: any, res: any) => {
  console.log(req);
  res.send("success");
});
router.get("/failure", (req: any, res: any) => {
  console.log(req);
  res.send("failure");
});
router.get("/pending", (req: any, res: any) => {
  console.log(req);
  res.send("pending");
});

// router.get("/getListBanks", getListBanks);

export default router;
