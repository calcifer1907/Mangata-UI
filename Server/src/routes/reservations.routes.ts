import { Router } from "express";

import {
  createReservation,
  getListSalesAdmin,
  getListSalesEmployee,
  getMinMax,
  checkReservation,
} from "../controllers/reservation.controller";

import ReservationController from "../controllers/reservation.controller";

import { authenticate } from "../handles/authMiddleware";

const router = Router();

router.post("/reservations", createReservation);
router.post("/mycommissions", authenticate, getListSalesEmployee);
router.post("/mySales", authenticate, getListSalesAdmin);
router.post("/check-reservation", checkReservation);
router.post("/getCodeReservation", ReservationController.getCodeReservation);

router.post(
  "/charListSales",
  authenticate,
  ReservationController.getCharListSalesAdmin
);
router.post(
  "/changeStatusReservation",
  authenticate,
  ReservationController.changeStatusReservation
);

router.post(
  "/saveGenerateCode",
  authenticate,
  ReservationController.saveCodeReservation
);

router.put(
  "/updatePaymentEmployee",
  authenticate,
  ReservationController.updatePaymentEmployee
);

router.get("/isDayBlocked", ReservationController.getIsBlockDay);
router.get("/lunches", ReservationController.getLunches);
router.get("/MimMax/:typeEvent", getMinMax);

export default router;
