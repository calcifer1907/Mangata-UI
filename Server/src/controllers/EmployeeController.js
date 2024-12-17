import { pool } from "../Connection.js";

export const getListUSers = async (request, response) => {
  try {
    const [row] = await pool.query("SELECT * FROM users;");
    response.json(row);
  } catch (error) {
    return response.status(500).json({ message: "sometghin gos wrong" });
  }
};
