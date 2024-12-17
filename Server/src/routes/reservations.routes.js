import express from "express";
import {
  createReservation,
  getLunches,
  getListSalesAdmin,
  getListSalesEmployee,
} from "../controllers/reservation.controller.js";

import { authenticate } from "../handles/authMiddleware.js";

const router = express.Router();

router.post("/reservations", createReservation);
router.post("/mycommissions", authenticate, getListSalesEmployee);
router.post("/mySales", getListSalesAdmin);
router.get("/lunches", getLunches);

export default router;
