import { pool } from "../Connection";
import { Request, Response } from "express";
import { comparePassword, createToken } from "../auth";

const SQL_FIND_USER = `SELECT us.ID,us.EMAIL,us.PASSWORD,CONCAT(us.FIRST_NAME,' ',us.LAST_NAME) AS USER_NAME,us.IS_ACTIVE,rl.DESCRIPTION,us.ROLE_ID
  FROM Users us INNER JOIN roles rl ON rl.ID = us.ROLE_ID;`;

export const getAllUser = async (request: Request, response: Response) => {
  const { email, password } = request.body;
  try {
    const resultUser = await pool.query(SQL_FIND_USER);
    const findUser = resultUser.rows.find((user: any) => user.email === email);
    if (!findUser) {
      return response.status(401).json({ message: "Usuario no encontrado" });
    }
    const params = [findUser.role_id];
    const resultRoles = await pool.query(
      "SELECT TITLE,PATH FROM menu_roles WHERE ROLE_ID=$1",
      params
    );
    const isPassword = comparePassword(password, findUser.password);
    if (!isPassword) {
      return response.status(401).json({ message: "Contraseña incorrecta" });
    }

    if (!findUser.is_active) {
      return response.status(401).json({ message: "Usuario no activo." });
    }

    const token = createToken(findUser.id, findUser.user_name);

    return response.json({
      TOKEN: token,
      USER_INFO: {
        ROLE: findUser.description,
        USER_NAME: findUser.user_name,
        ID_EMPLOYEE: findUser.id,
      },
      MENU: resultRoles.rows,
    });
  } catch (error) {
    return response.status(500).json({ message: "Something went wrong" });
  }
};
