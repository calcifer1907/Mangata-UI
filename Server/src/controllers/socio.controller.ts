import AppError from "../errors/appError";
import socioRepository from "../repository/socioRepository";
import { Request, Response } from "express";

class SocioController {
  async sumCommission(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const socios = await socioRepository.sumCommission(Number(id));
      return res.json(socios); // Se agrega return para detener la ejecución
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message }); // Se agrega return
      } else {
        return res.status(500).json({ message: "Something wrong error!" }); // Se agrega return
      }
    }
  }

  async getListBanks(_req: Request, res: Response): Promise<any> {
    try {
      const listBanks = await socioRepository.getListBanks();
      return res.json(listBanks); // Se agrega return para detener la ejecución
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message }); // Se agrega return
      } else {
        return res.status(500).json({ message: "Something wrong error!" }); // Se agrega return
      }
    }
  }
}

export default new SocioController();
