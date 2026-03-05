import { Router } from "express";

import { sendContactFormEmail } from "../controllers/sendEmail.controller";

const router = Router();

router.post("/contactForm", sendContactFormEmail);

export default router;
