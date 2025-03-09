import { Router } from "express";

const router = Router();

import { downloadExcel } from "../controllers/exportData.controller";

// Ruta para descargar el archivo Excel
router.post("/download-excel", downloadExcel);

export default router;
