import { pool } from "../Connection.js";

export const getListUSers = async (request, response, next) => {
  try {
    const [row] = await pool.query("SELECT * FROM users;");
    response.json(row);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (request, response, next) => {
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
    const [row] = await pool.query(
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
    response.json(row);
  } catch (error) {
    next(error);
  }
};
