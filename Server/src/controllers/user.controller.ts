import { Request, Response } from "express";

import UserRepository from "../repository/userRepository";
import AppError from "../errors/appError";

class UserController {
  async getUserName(request: Request, response: Response): Promise<void> {
    try {
      const { id } = request.body;
      if (id !== -1) {
        const result = await UserRepository.getUserName(id);
        response.json(result);
      } else {
        const system = await UserRepository.getUserNameSystem();
        response.json(system);
      }
    } catch (error) {
      if (error instanceof AppError) {
        response.status(error.statusCode).json({ message: error.message });
      } else {
        response.status(500).json({ message: "Something wrong error!" });
      }
    }
  }

  async createUser(request: Request, response: Response) {
    try {
      const values = [request.body];
      const result = await UserRepository.createUser(values);
      response.json(result);
    } catch (error) {
      if ((error as { code: string })?.code === "23505")
        response.status(409).json({
          message: "Error: El correo electrónico ya está registrado.",
        });
    }
  }

  async validExistEmail(request: Request, response: Response): Promise<void> {
    const { email } = request.body;
    try {
      const result = await UserRepository.validExistEmail(email);
      response.json(result);
    } catch (error) {
      response.status(500).json({ message: "sometghin gos wrong" });
    }
  }
}

export default new UserController();
