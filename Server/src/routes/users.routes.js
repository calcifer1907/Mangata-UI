import { Router } from "express";
import { authenticate } from "../handles/authMiddleware.js";
import { handleError } from "../handles/handleEror.js";
const router = Router();

import { createUser } from "../controllers/user.controller.js";

router.post("/createUser", createUser);

export default router;
