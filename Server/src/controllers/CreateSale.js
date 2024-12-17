import { connection } from "../Connection";

export const createSale = async (request, response) => {
  try {
    const [row] = await connection.query("SELECT * FROM employee;");
    response.json(row);
  } catch (error) {
    return response.status(500).json({ message: "sometghin gos wrong" });
  }
};
