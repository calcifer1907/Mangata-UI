import { Router } from "express";

import {
  createReservation,
  getLunches,
  getListSalesAdmin,
  getListSalesEmployee,
  getMinMax,
  changeStatusReservation,
  checkReservation,
  updatePaymentEmployee,
} from "../controllers/reservation.controller";

import ReservationController from "../controllers/reservation.controller";

import { authenticate } from "../handles/authMiddleware";

const router = Router();

router.post("/reservations", createReservation);

router.post("/mycommissions", authenticate, getListSalesEmployee);

router.post("/mySales", authenticate, getListSalesAdmin);

router.post("/changeStatusReservation", authenticate, changeStatusReservation);

router.post("/saveGenerateCode", ReservationController.saveCodeReservation);

router.put("/updatePaymentEmployee", authenticate, updatePaymentEmployee);

router.post("/check-reservation", checkReservation);

router.get("/lunches", getLunches);

router.get("/MimMax", getMinMax);

export default router;
