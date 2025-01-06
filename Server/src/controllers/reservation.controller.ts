import { Request, Response } from "express";
import { pool } from "../Connection";

export const createReservation = async (
  request: Request,
  response: Response
) => {
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
    const result = await pool.query(
      "INSERT INTO reservations(CODE_RESERVATION,ID_EMPLOYEE,TELEPHONE,CURRENT_COMMISSION,COMMISSION_EMPLOYEE,CREATED_AT) VALUES($1,$2,$3,$4,$5,$6);",
      [
        CODE_RESERVATION,
        ID_EMPLOYEE,
        TELEPHONE,
        MIN_PRICE,
        AGREED_PRICE,
        CREATED_AT,
      ]
    );

    const idsReservation = ACCOMPANIST.map(() => CODE_RESERVATION);
    const namesAccompanist = ACCOMPANIST.map((items: any) => items.name);
    const idsLunches = ACCOMPANIST.map((items: any) =>
      items.lunch.value.toString()
    );

    await pool.query(
      "INSERT INTO accompanist(ID_RESERVATION,NAME_ACCOMPANIST,ID_LUNCHES) SELECT * FROM UNNEST($1::text[], $2::text[], $3::int[]);",
      [idsReservation, namesAccompanist, idsLunches]
    );
    response.status(201).json({ id: result.rowCount, message: "success" });
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: "sometghin gos wrong" });
  }
};

export const getLunches = async (_request: Request, response: Response) => {
  try {
    const result = await pool.query("SELECT ID,DESCRIPTION FROM lunches;");
    response.send(result.rows);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: "sometghin gos wrong" });
  }
};

export const getListSalesEmployee = async (
  request: Request,
  response: Response
) => {
  try {
    const { date } = request.body;
    const result = await pool.query(
      `SELECT re.CODE_RESERVATION, re.STATUS_RESERVATION, re.COMMISSION_EMPLOYEE, re.CURRENT_COMMISSION, re.CREATED_AT, ac.NAME_ACCOMPANIST
        FROM reservations re 
        INNER JOIN accompanist ac ON ac.ID_RESERVATION = re.CODE_RESERVATION  
        WHERE re.CREATED_AT=$1 
        GROUP BY re.CODE_RESERVATION, re.STATUS_RESERVATION, re.COMMISSION_EMPLOYEE, re.CURRENT_COMMISSION, re.CREATED_AT, ac.NAME_ACCOMPANIST`,
      [date]
    );
    console.log(result.rows);
    const diff = result.rows.map((values: any, index: number) => ({
      ...values,
      id: index + 1,
      DIFF: values.commission_employee - values.current_commission,
    }));
    response.json(diff);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: "sometghin gos wrong" });
  }
};

const findEmployee = (users: any, idEmployee: string) => {
  return users.find((user: any) => user.ID === idEmployee);
};

export const getListSalesAdmin = async (
  request: Request,
  response: Response
) => {
  try {
    const { date } = request.body;
    const result = await pool.query(
      `SELECT re.CODE_RESERVATION, re.ID_EMPLOYEE, re.STATUS_RESERVATION, re.COMMISSION_EMPLOYEE, re.CURRENT_COMMISSION, re.CREATED_AT, ac.NAME_ACCOMPANIST
      FROM reservations re
      INNER JOIN accompanist ac ON ac.ID_RESERVATION = re.CODE_RESERVATION
      WHERE CREATED_AT = $1
      GROUP BY re.CODE_RESERVATION, re.ID_EMPLOYEE, re.STATUS_RESERVATION, re.COMMISSION_EMPLOYEE, re.CURRENT_COMMISSION, re.CREATED_AT, ac.NAME_ACCOMPANIST`,
      [date]
    );

    const dataUser = await pool.query(
      "SELECT ID,CONCAT(FIRST_NAME,' ',LAST_NAME) AS USER_NAME FROM users WHERE ROLE_ID=2 OR ROLE_ID=3;"
    );
    const diff = result.rows.map((values, index) => ({
      ...values,
      id: index + 1,
      DIFF: values.COMMISSION_EMPLOYEE - values.CURRENT_COMMISSION,
      EMPLOYEE:
        findEmployee(dataUser.rows, values.ID_EMPLOYEE)?.USER_NAME ?? "",
    }));
    response.json(diff);
  } catch (error) {
    return response.status(500).json({ message: "sometghin gos wrong" });
  }
};

export const getMinMax = async (_request: Request, response: Response) => {
  try {
    const result = await pool.query("SELECT MIN,MAX FROM min_max;");
    response.json(result.rows[0]);
  } catch (error) {
    return response.status(500).json({ message: "sometghin gos wrong" });
  }
};

export const changeStatusReservation = async (
  request: Request,
  response: Response
) => {
  try {
    const { id, status, updated } = request.body;
    const result = await pool.query(
      "UPDATE reservations SET STATUS_RESERVATION=?,UPDATED_AT=? WHERE CODE_RESERVATION=?;",
      [status, updated, id]
    );

    response.json(result.rows[0]);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ message: "sometghin gos wrong" });
  }
};
