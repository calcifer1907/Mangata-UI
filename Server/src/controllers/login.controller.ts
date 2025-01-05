import { pool } from "../Connection";
import { Request, Response } from "express";
import { comparePassword, createToken } from "../auth";

const SQL_FIND_USER = `SELECT us.ID,us.EMAIL,us.PASSWORD,CONCAT(us.FIRST_NAME," ",us.LAST_NAME) AS USER_NAME,rl.DESCRIPTION,us.ROLE_ID
  FROM Users us INNER JOIN roles rl ON rl.ID = us.ROLE_ID;`;

export const getAllUser = async (request: Request, response: Response) => {
  const { email, password } = request.body;
  try {
    const resultUser = await pool.query(SQL_FIND_USER);
    const findUser = resultUser.rows.find((user: any) => user.EMAIL === email);
    if (!findUser) {
      return response.status(401).json({ message: "Usuario no encontrado" });
    }
    const resultRoles = await pool.query(
      "SELECT TITLE,PATH FROM menu_roles WHERE ROLE_ID=?",
      [findUser.ROLE_ID]
    );

    const isPassword = comparePassword(password, findUser.PASSWORD);
    if (!isPassword) {
      return response.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = createToken(findUser.ID, findUser.USER_NAME);

    response.json({
      TOKEN: token,
      USER_INFO: {
        ROLE: findUser.DESCRIPTION,
        USER_NAME: findUser.USER_NAME,
        ID_EMPLOYEE: findUser.ID,
      },
      MENU: resultRoles.rows,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: "sometghin gos wrong" });
  }
};
