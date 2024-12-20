import express from "express";
import {
  createReservation,
  getLunches,
  getListSalesAdmin,
  getListSalesEmployee,
  getMinMax,
} from "../controllers/reservation.controller.js";

import { authenticate } from "../handles/authMiddleware.js";

const router = express.Router();

router.post("/reservations", createReservation);
router.post("/mycommissions", authenticate, getListSalesEmployee);
router.post("/mySales", getListSalesAdmin);
router.get("/lunches", getLunches);
router.get("/MimMax", getMinMax);

export default router;
