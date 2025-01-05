import express from "express";
import { authenticate } from "../handles/authMiddleware.js";

const router = express.Router();

// Ruta protegida
router.get("/protected", authenticate, (request, response) => {
  response.json({
    message: "Acceso concedido a ruta protegida",
    user: req.user,
  });
});

export default router;
