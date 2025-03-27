import { NextFunction, Request, Response } from "express";
import { pool } from "../Connection";
import AppError from "../errors/appError";

import reservationRepository from "../repository/reservationRepository";

import userRepository from "../repository/userRepository";

// import { sendEmail } from "./sendEmail.controller";

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
    EMAIL,
  } = request.body;
  try {
    const result = await pool.query(
      "INSERT INTO reservations(CODE_RESERVATION,ID_EMPLOYEE,TELEPHONE,EMAIL,CURRENT_COMMISSION,COMMISSION_EMPLOYEE,CREATED_AT) VALUES($1,$2,$3,$4,$5,$6,$7);",
      [
        CODE_RESERVATION,
        ID_EMPLOYEE,
        TELEPHONE,
        EMAIL,
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
    // sendEmail(CODE_RESERVATION);
  } catch (_error) {
    console.log(_error);
    response.status(500).json({ message: "sometghin gos wrong" });
  }
};

export const getListSalesEmployee = async (
  request: Request,
  response: Response
) => {
  try {
    const { date, id_employee } = request.body;

    const resultReservations = await pool.query(
      `SELECT CODE_RESERVATION, ID_EMPLOYEE, STATUS_RESERVATION, CREATED_AT FROM reservations  
      WHERE CREATED_AT = $1 AND ID_EMPLOYEE = $2`,
      [date, id_employee]
    );

    const codeReservations = resultReservations.rows.map(
      (values) => values.code_reservation
    );

    const resultAccompanist = await pool.query(
      `SELECT ac.NAME_ACCOMPANIST, lun.DESCRIPTION, ac.ID_RESERVATION FROM  
      accompanist ac INNER JOIN lunches lun ON lun.ID = ac.ID_LUNCHES WHERE ac.ID_RESERVATION = ANY($1::text[])`,
      [codeReservations]
    );

    const diff = resultReservations.rows.map((values: any, index: number) => ({
      ...values,
      id: index + 1,
      ACCOMPANIST: resultAccompanist.rows.filter(
        (item) => item.id_reservation === values.code_reservation
      ),
    }));
    response.json(diff);
  } catch (_error) {
    console.log(_error);
    response.status(500).json({ message: "sometghin gos wrong" });
  }
};

const findEmployeeById = (users: any, idEmployee: string) => {
  const user = users.find((user: any) => user.id === idEmployee);
  return user;
};

export const getListSalesAdmin = async (
  request: Request,
  response: Response
) => {
  try {
    const { date } = request.body;
    const resultReservations = await pool.query(
      `SELECT CODE_RESERVATION, ID_EMPLOYEE, STATUS_RESERVATION, COMMISSION_EMPLOYEE, CURRENT_COMMISSION,PAY, CREATED_AT FROM reservations  WHERE CREATED_AT = $1`,
      [date]
    );
    const codeReservations = resultReservations.rows.map(
      (values) => values.code_reservation
    );
    const resultAccompanist = await pool.query(
      `SELECT ac.NAME_ACCOMPANIST, lun.DESCRIPTION, ac.ID_RESERVATION FROM  
      accompanist ac INNER JOIN lunches lun ON lun.ID = ac.ID_LUNCHES WHERE ac.ID_RESERVATION = ANY($1::text[])`,
      [codeReservations]
    );

    const dataUser = await pool.query(
      "SELECT ID,CONCAT(FIRST_NAME,' ',LAST_NAME) AS USER_NAME,BANK_ACCOUNT FROM users WHERE ROLE_ID=2 OR ROLE_ID=3;"
    );

    const diff = resultReservations.rows.map((values, index) => {
      const employee = findEmployeeById(dataUser.rows, values.id_employee);
      const BANK_ACCOUNT = employee?.bank_account ?? "";
      const EMPLOYEE = employee?.user_name ?? "";
      return {
        ...values,
        id: index + 1,
        DIFF: values.commission_employee - values.current_commission,
        EMPLOYEE,
        BANK_ACCOUNT,
        ACCOMPANIST: resultAccompanist.rows.filter(
          (item) => item.id_reservation === values.code_reservation
        ),
      };
    });
    response.json(diff);
  } catch (error) {
    response.status(500).json({ message: "sometghin gos wrong" });
  }
};

export const getMinMax = async (_request: Request, response: Response) => {
  try {
    const result = await pool.query("SELECT MIN,MAX FROM min_max;");
    response.json(result.rows[0]);
  } catch (error) {
    response.status(500).json({ message: "sometghin gos wrong" });
  }
};

export const changeStatusReservation = async (
  request: Request,
  response: Response
) => {
  try {
    const { id, status, updated } = request.body;
    const result = await pool.query(
      "UPDATE reservations SET STATUS_RESERVATION=$1,UPDATED_AT=$2 WHERE CODE_RESERVATION=$3;",
      [status, updated, id]
    );

    response.json(result.rows[0]);
  } catch (error) {
    response.status(500).json({ message: "sometghin gos wrong" });
  }
};

export const updatePaymentEmployee = async (
  request: Request,
  response: Response
) => {
  try {
    const { id, pay } = request.body;
    const result = await pool.query(
      "UPDATE reservations SET PAY=$1 WHERE CODE_RESERVATION=$2;",
      [pay, id]
    );
    if (result.rows)
      response.json({ messagge: "Se modifico Correctamente", status: 201 });
  } catch (error) {
    response.status(500).json({ message: "sometghin gos wrong" });
  }
};

export const checkReservation = async (
  req: any,
  res: any,
  next: NextFunction
): Promise<void> => {
  const { payment_id } = req.body;
  try {
    if (payment_id) {
      const resultReservations = await pool.query(
        `SELECT CODE_RESERVATION, STATUS_RESERVATION, COMMISSION_EMPLOYEE , CREATED_AT FROM reservations  WHERE PAYMENT_ID = $1`,
        [payment_id]
      );
      if (resultReservations.rowCount === 0) {
        res.status(404).json({ message: "Reservation not found" });
      } else {
        const {
          code_reservation,
          commission_employee,
          created_at,
          status_reservation,
        } = resultReservations.rows[0];

        const resultAccompanist = await pool.query(
          `SELECT COUNT(ID_RESERVATION) AS TOTAL_PERSONS  FROM accompanist  WHERE ID_RESERVATION = $1`,
          [code_reservation]
        );

        if (resultAccompanist.rowCount === 0) {
          res.status(404).json({ message: "Accompanist not found" });
        } else {
          const { total_persons } = resultAccompanist.rows[0];
          res.json({
            created_at,
            code_reservation,
            status_reservation,
            total_payment: Number(commission_employee) * total_persons || 0,
          });
        }
      }
    }
  } catch (error) {
    next(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

class ReservationController {
  async saveCodeReservation(
    request: Request,
    response: Response
  ): Promise<void> {
    try {
      const { code } = request.body;
      const values = request.body;
      const code_saved = await reservationRepository.saveCodeReservation(
        values
      );
      if (code_saved) {
        const res = { status: 201, code, id: null };
        response.json(res);
      }
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        response.status(404).json({ message: error.message });
      }
    }
  }

  async getLunches(_request: Request, response: Response) {
    try {
      const result = await reservationRepository.getLunches();
      response.send(result);
    } catch (error) {
      response.status(500).json({ message: "sometghin gos wrong" });
    }
  }

  async getCodeReservation(
    request: Request,
    response: Response
  ): Promise<void> {
    try {
      const { code } = request.body;
      const result = await reservationRepository.getCodeReservation(code);
      if (result) {
        const user = await userRepository.getUserName(result.id);
        result.user_name = user.user_name;
      }
      response.json(result);
    } catch (error) {
      if (error instanceof Error) {
        response.status(404).json({ message: error.message });
      }
    }
  }

  async webhookBold(request: Request, response: Response) {
    console.log(request);
    response.status(200);
  }
}

export default new ReservationController();
