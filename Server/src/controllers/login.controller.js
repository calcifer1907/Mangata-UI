import { pool } from "../Connection.js";
import { comparePassword, createToken } from "../auth.js";

const SQL_FIND_USER = `SELECT us.EMAIL,us.PASSWORD,CONCAT(us.FIRST_NAME," ",us.LAST_NAME) AS USER_NAME,rl.DESCRIPTION,us.ROLE_ID
  FROM Users us INNER JOIN roles rl ON rl.ID = us.ROLE_ID;`;

export const getAllUser = async (request, response) => {
  const { email, password } = request.body;
  try {
    const [row] = await pool.query(SQL_FIND_USER);
    console.log("BODY", { email, password });
    const findUser = row.find((user) => user.EMAIL === email);

    if (!findUser) {
      return response.status(401).json({ message: "Usuario no encontrado" });
    }
    const [menuRoles] = await pool.query(
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
      ROLE: findUser.DESCRIPTION,
      USER_NAME: findUser.USER_NAME,
      MENU: menuRoles,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: "sometghin gos wrong" });
  }
};
