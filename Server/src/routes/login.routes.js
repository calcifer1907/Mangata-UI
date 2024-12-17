import express from "express";
import { getAllUser } from "../controllers/login.controller.js";

const router = express.Router();

router.post("/login", getAllUser);

export default router;
