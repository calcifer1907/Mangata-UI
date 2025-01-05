import express from "express";

import {
  createReservation,
  getLunches,
  getListSalesAdmin,
  getListSalesEmployee,
  getMinMax,
  changeStatusReservation,
} from "../controllers/reservation.controller";

import { authenticate } from "../handles/authMiddleware";

const router = express.Router();

//@ts-ignore
router.post("/reservations", createReservation);
//@ts-ignore
router.post("/mycommissions", authenticate, getListSalesEmployee);
//@ts-ignore
router.post("/mySales", authenticate, getListSalesAdmin);
//@ts-ignore
router.post("/changeStatusReservation", authenticate, changeStatusReservation);

//@ts-ignore
router.get("/lunches", getLunches);
//@ts-ignore
router.get("/MimMax", getMinMax);

export default router;
