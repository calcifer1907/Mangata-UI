import { pool } from "../Connection.js";

export const createReservation = async (request, response) => {
  const {
    CODE_RESERVATION,
    ID_EMPLOYEE,
    TELEPHONE,
    AGREED_PRICE,
    ACCOMPANIST,
    MIN_PRICE,
    CREATED_AT,
  } = request.body;
  try {
    const [row] = await pool.query(
      "INSERT INTO reservations(CODE_RESERVATION,ID_EMPLOYEE,TELEPHONE,CURRENT_COMMISSION,COMMISSION_EMPLOYEE,CREATED_AT) VALUES(?,?,?,?,?,?);",
      [
        CODE_RESERVATION,
        ID_EMPLOYEE,
        TELEPHONE,
        MIN_PRICE,
        AGREED_PRICE,
        CREATED_AT,
      ]
    );
    const newAccompanist = ACCOMPANIST.map((items) => [
      CODE_RESERVATION,
      items.name,
      items.lunch.value.toString(),
    ]);
    await pool.query(
      "INSERT INTO accompanist(ID_RESERVATION,NAME_ACCOMPANIST,ID_LUNCHES) VALUES ?;",
      [newAccompanist]
    );
    console.log(row);
    response.status(201).json({ id: row.insertId, message: "success" });
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

const findEmployee = (users, idEmployee) => {
  return users.find((user) => user.ID === idEmployee);
};

export const getListSalesAdmin = async (request, response) => {
  try {
    const { date } = request.body;
    const [row] = await pool.query(
      `SELECT re.CODE_RESERVATION,re.ID_EMPLOYEE,re.STATUS_RESERVATION,re.COMMISSION_EMPLOYEE,re.CURRENT_COMMISSION,re.CREATED_AT,ac.NAME_ACCOMPANIST
       FROM reservations re INNER JOIN accompanist ac ON ac.ID_RESERVATION = re.CODE_RESERVATION  WHERE CREATED_AT=? GROUP BY ac.ID_RESERVATION;`,
      [date]
    );

    const [dataUser] = await pool.query(
      "SELECT ID,CONCAT(FIRST_NAME,' ',LAST_NAME) AS USER_NAME FROM users WHERE ROLE_ID=2 OR ROLE_ID=3;"
    );
    const diff = row.map((values, index) => ({
      ...values,
      id: index + 1,
      DIFF: values.COMMISSION_EMPLOYEE - values.CURRENT_COMMISSION,
      EMPLOYEE: findEmployee(dataUser, values.ID_EMPLOYEE)?.USER_NAME ?? "",
    }));
    response.json(diff);
  } catch (error) {
    return response.status(500).json({ message: "sometghin gos wrong" });
  }
};

export const getMinMax = async (_request, response) => {
  try {
    const [row] = await pool.query("SELECT MIN,MAX FROM min_max;");
    response.json(row[0]);
  } catch (error) {
    return response.status(500).json({ message: "sometghin gos wrong" });
  }
};

export const changeStatusReservation = async (request, response) => {
  try {
    const { id, status, updated } = request.body;
    const [row] = await pool.query(
      "UPDATE reservations SET STATUS_RESERVATION=?,UPDATED_AT=? WHERE CODE_RESERVATION=?;",
      [status, updated, id]
    );

    response.json(row[0]);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: "sometghin gos wrong" });
  }
};
