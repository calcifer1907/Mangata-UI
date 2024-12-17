import { pool } from "../Connection.js";

export const createReservation = async (request, response) => {
  const {
    CODE_RESERVATION,
    ID_EMPLOYEE,
    TELEPHONE,
    AGREED_PRICE,
    ACCOMPANIST,
  } = request.body;
  try {
    const [row] = await pool.query(
      "INSERT INTO reservations(CODE_RESERVATION,ID_EMPLOYEE,TELEPHONE,AGREED_PRICE) VALUES(?,?,?,?);",
      [CODE_RESERVATION, ID_EMPLOYEE, TELEPHONE, AGREED_PRICE]
    );
    ACCOMPANIST.forEach(async (items) => {
      await pool.query(
        "INSERT INTO accompanist(ID_RESERVATION,NAME_ACCOMPANIST,ID_LUNCHES) VALUES(?,?,?);",
        [CODE_RESERVATION, items.name, items.lunche]
      );
    });

    response.status(201).json({ id: row.insertId });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: "sometghin gos wrong" });
  }
};

export const getLunches = async (_request, response) => {
  try {
    const [row] = await pool.query("SELECT ID,DESCRIPTION FROM lunches;");
    response.json(row);
  } catch (error) {
    return response.status(500).json({ message: "sometghin gos wrong" });
  }
};

export const getListSalesEmployee = async (request, response) => {
  try {
    const { date } = request.body;
    const [row] = await pool.query(
      "SELECT CODE_RESERVATION,STATUS_RESERVATION,COMMISSION_EMPLOYEE,CURRENT_COMMISSION,CREATED_AT FROM reservations WHERE CREATED_AT=?",
      [date]
    );
    const diff = row.map((values, index) => ({
      ...values,
      id: index + 1,
      DIFF: values.COMMISSION_EMPLOYEE - values.CURRENT_COMMISSION,
    }));
    response.json(diff);
  } catch (error) {
    return response.status(500).json({ message: "sometghin gos wrong" });
  }
};

const findEmployee = (users, idUser) => {
  return users.find((user) => user.ID === idUser);
};

export const getListSalesAdmin = async (request, response) => {
  try {
    const { date } = request.body;
    console.log("DATE: ", date);
    const [row] = await pool.query(
      "SELECT CODE_RESERVATION,ID_EMPLOYEE,STATUS_RESERVATION,COMMISSION_EMPLOYEE,CURRENT_COMMISSION,CREATED_AT FROM reservations WHERE CREATED_AT=?",
      [date]
    );
    const [dataUser] = await pool.query(
      "SELECT ID,CONCAT(FIRST_NAME,' ',LAST_NAME) AS USER_NAME FROM users WHERE ROLE_ID=2;"
    );
    const diff = row.map((values, index) => ({
      ...values,
      id: index + 1,
      DIFF: values.COMMISSION_EMPLOYEE - values.CURRENT_COMMISSION,
      EMPLOYEE: findEmployee(dataUser, values.ID_EMPLOYEE).USER_NAME,
    }));
    response.json(diff);
  } catch (error) {
    return response.status(500).json({ message: "sometghin gos wrong" });
  }
};
