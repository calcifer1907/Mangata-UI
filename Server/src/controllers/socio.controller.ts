import AppError from "../errors/appError";
import socioRepository from "../repository/socioRepository";
import { Request, Response } from "express";

class SocioController {
  async sumCommission(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const socios = await socioRepository.sumCommission(Number(id));
      res.json(socios);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Something wrong error!" });
      }
    }
  }
}

export default new SocioController();
