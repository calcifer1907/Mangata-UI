import express from "express";
import { getAllUser } from "../controllers/login.controller";

const router = express.Router();
//@ts-ignore
router.post("/login", getAllUser);

export default router;
