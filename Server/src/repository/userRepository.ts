import { pool } from "../Connection";
import { IMessages, ISaveUSer, IUserName } from "../interfaces/IUSers";

class UserRepository {
  async getUserName(id: number): Promise<IUserName> {
    const SQL_QUERY = `SELECT CONCAT(FIRST_NAME,' ',LAST_NAME) AS USER_NAME,ID FROM users WHERE ID=$1;`;
    try {
      const { rows } = await pool.query(SQL_QUERY, [id]);
      return rows[0] || null;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }

  async getUserNameSystem(): Promise<IUserName> {
    const SQL_QUERY = `SELECT CONCAT(FIRST_NAME,' ',LAST_NAME) AS USER_NAME,ID FROM users WHERE CONCAT(FIRST_NAME,LAST_NAME) LIKE '%Mangata%';`;
    try {
      const { rows } = await pool.query(SQL_QUERY);
      return rows[0] || null;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }

  async createUser(values: ISaveUSer[]): Promise<IMessages> {
    const SQL_QUERY =
      "INSERT INTO users(FIRST_NAME,LAST_NAME,EMAIL,BANK_ACCOUNT,PASSWORD,ROLE_ID,IS_ACTIVE,CREATED_AT) VALUES($1,$2,$3,$4,$5,$6,$7,$8);";
    try {
      const { rowCount } = await pool.query(SQL_QUERY, values);
      if (rowCount === 0) throw new Error("Error Inserting");
      return { message: "success" };
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }

  async validExistEmail(email: string): Promise<IMessages> {
    const SQL_QUERY = `SELECT EMAIL FROM users WHERE EMAIL=$1;`;
    try {
      const result = await pool.query(SQL_QUERY, [email]);
      if (result.rows.length > 0)
        return { message: "El correo ya está registrado" };
      return { message: "Correo disponible" };
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }
}

export default new UserRepository();
