import { Router } from "express";
import { authenticate } from "../handles/authMiddleware";
import { handleError } from "../handles/handleEror";
const router = Router();

import { createUser, getSearchUser } from "../controllers/user.controller";

//@ts-ignore
router.post("/createUser", createUser);
//@ts-ignore
router.post("/getuserid", getSearchUser);

export default router;
