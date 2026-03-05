import AppError from "../errors/appError";
import boat from "../repository/boat";
import { Request, Response } from "express";

class BoatController {
  async blockerCalendar(req: Request, res: Response): Promise<any> {
    try {
      const { currentDate } = req.body;
      const calendarBlock = await boat.blockCalendar(currentDate);
      return res.json(calendarBlock);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message }); // Se agrega return
      } else {
        return res.status(500).json({ message: "Something wrong error!" }); // Se agrega return
      }
    }
  }
}

export default new BoatController();
