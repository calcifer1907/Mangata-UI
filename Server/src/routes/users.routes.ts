import { Router } from "express";

import userController from "../controllers/user.controller";

const router = Router();

router.post("/createUser", userController.createUser);

router.post("/getuserid", userController.getUserName);

router.post("/validEmail", userController.validExistEmail);

export default router;
