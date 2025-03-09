import { Router } from "express";
import { authenticate } from "../handles/authMiddleware";
import { handleError } from "../handles/handleEror";
const router = Router();

import {
  createUser,
  getSearchUser,
  getListUSers,
  validExistEmail,
} from "../controllers/user.controller";

//@ts-ignore
router.post("/createUser", createUser);
//@ts-ignore
router.post("/getuserid", getSearchUser);
//@ts-ignore
router.post("/getusers", getListUSers);
//@ts-ignore
router.post("/validEmail", validExistEmail);

export default router;
