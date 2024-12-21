import { Router } from "express";
import { authenticate } from "../handles/authMiddleware.js";
import { handleError } from "../handles/handleEror.js";
const router = Router();

import { createUser, getSearchUser } from "../controllers/user.controller.js";

router.post("/createUser", createUser);
router.post("/getuserid", hashchange, getSearchUser);

export default router;
