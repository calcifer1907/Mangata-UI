import { Request, Response } from "express";

import { pool } from "../Connection";
import { throws } from "assert";
import { stat } from "fs";

export const getListUSers = async (
  _request: Request,
  response: Response
): Promise<Response<any, Record<string, any>> | undefined> => {
  try {
    const result = await pool.query("SELECT * FROM users;");
    response.json(result.rows);
  } catch (error) {
    return response.status(500).json({ message: "sometghin gos wrong" });
  }
};

export const getSearchUser = async (
  request: Request,
  response: Response
): Promise<Response<any, Record<string, any>> | undefined> => {
  try {
    const { id } = request.body;
    const result = await pool.query(
      "SELECT CONCAT(FIRST_NAME,' ',LAST_NAME) AS USER_NAME,ID FROM users WHERE ID=$1;",
      [id]
    );
    if (result.rows.length === 0) {
      const system = await pool.query(
        "SELECT CONCAT(FIRST_NAME,' ',LAST_NAME) AS USER_NAME,ID FROM users WHERE CONCAT(FIRST_NAME,LAST_NAME) LIKE '%system%';"
      );
      return response.json(system.rows[0]);
    }
    response.json(result.rows[0]);
  } catch (error) {
    return response.status(500).json({ message: "sometghin gos wrong" });
  }
};

export const createUser = async (request: Request, response: Response) => {
  const {
    FIRST_NAME,
    LAST_NAME,
    EMAIL,
    BANK_ACCOUNT,
    ROLE_ID,
    PASSWORD,
    IS_ACTIVE,
    CREATED_AT,
  } = request.body;

  try {
    const values = [
      FIRST_NAME,
      LAST_NAME,
      EMAIL,
      BANK_ACCOUNT,
      PASSWORD,
      ROLE_ID,
      IS_ACTIVE,
      CREATED_AT,
    ];
    const result = await pool.query(
      "INSERT INTO users(FIRST_NAME,LAST_NAME,EMAIL,BANK_ACCOUNT,PASSWORD,ROLE_ID,IS_ACTIVE,CREATED_AT) VALUES($1,$2,$3,$4,$5,$6,$7,$8);",
      values
    );
    if (result.rowCount === 0) throw new Error("Error al insertar");
    response.json({ message: "success" });
  } catch (error) {
    if ((error as { code: string })?.code === "23505")
      return response
        .status(409)
        .json({ message: "Error: El correo electrónico ya está registrado." });

    return response.status(500).json({ message: "sometghin gos wrong" });
  }
};

export const validExistEmail = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const { email } = request.body;
  try {
    const result = await pool.query("SELECT EMAIL FROM users WHERE EMAIL=$1;", [
      email,
    ]);
    if (result.rows.length > 0)
      return response.json({
        message: "El correo ya está registrado",
        status: 409,
      });
    return response.json({ message: "Correo disponible", status: 201 });
  } catch (error) {
    return response.status(500).json({ message: "sometghin gos wrong" });
  }
};
