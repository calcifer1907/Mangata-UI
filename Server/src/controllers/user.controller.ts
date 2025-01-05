import { Request, Response } from "express";

import { pool } from "../Connection";

export const getListUSers = async (_request: Request, response: Response) => {
  try {
    const result = await pool.query("SELECT * FROM users;");
    response.json(result.rows);
  } catch (error) {
    return response.status(500).json({ message: "sometghin gos wrong" });
  }
};

export const getSearchUser = async (request: Request, response: Response) => {
  try {
    const { id } = request.body;
    const [row] = await pool.query(
      "SELECT CONCAT(FIRST_NAME,' ',LAST_NAME) AS USER_NAME,ID FROM users WHERE ID=?;",
      [id]
    );
    if (row.length === 0) {
      const [system] = await pool.query(
        "SELECT CONCAT(FIRST_NAME,' ',LAST_NAME) AS USER_NAME,ID FROM users WHERE CONCAT(FIRST_NAME,LAST_NAME) LIKE '%system%';"
      );
      return response.json(system[0]);
    }
    response.json(row[0]);
  } catch (error) {
    return response.status(500).json({ message: "sometghin gos wrong" });
  }
};

export const createUser = async (request: Request, response: Response) => {
  const {
    first_name,
    last_name,
    email,
    account_bank,
    role,
    password,
    is_active,
    created_at,
  } = request.body;

  try {
    await pool.query(
      "INSERT INTO users(FIRST_NAME,LAST_NAME,EMAIL,BANK_ACCOUNT,PASSWORD,ROLE_ID,IS_ACTIVE,CREATED_AT) VALUES (?,?,?,?,?,?,?,?);",
      [
        first_name,
        last_name,
        email,
        account_bank,
        password,
        role,
        is_active,
        created_at,
      ]
    );
    response.json({ message: "success" });
  } catch (error) {
    return response.status(500).json({ message: "sometghin gos wrong" });
  }
};
