import { Router } from "express";

const router = Router();

import { downloadExcel } from "../controllers/exportData.controller";

router.post("/download-excel", downloadExcel);

export default router;
