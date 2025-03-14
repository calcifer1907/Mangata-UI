import { Router } from "express";

const router = Router();

import socioController from "../controllers/socio.controller";

router.get("/commission/:id", socioController.sumCommission);
