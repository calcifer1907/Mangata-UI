import { Router } from "express";

import BoatController from "../controllers/boat.controller";

const router = Router();

router.post("/blockCalendar", BoatController.blockerCalendar);

export default router;
