import { Request, Response } from "express";

import { pool } from "../Connection";

import * as XLSX from "xlsx";

const findEmployeeById = (users: any, idEmployee: string) => {
  const user = users.find((user: any) => user.id === idEmployee);
  console.log(user, idEmployee);
  return user;
};

const calculatingDate = async (startDate: string, enddate: string) => {
  try {
    const resultReservations = await pool.query(
      `SELECT CODE_RESERVATION, ID_EMPLOYEE, STATUS_RESERVATION, COMMISSION_EMPLOYEE, CURRENT_COMMISSION, CREATED_AT FROM reservations  WHERE CREATED_AT BETWEEN $1 AND $2 `,
      [startDate, enddate]
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
    return diff;
  } catch (error) {
    return new Error("sometghin gos wrong");
  }
};

export const downloadExcel = async (request: Request, response: Response) => {
  const { startDate, endDate } = request.body;
  calculatingDate(startDate, endDate).then((data) => {
    if (data instanceof Error) {
      return response.status(500).json({ message: data.message });
    }
    // Crear una hoja de trabajo
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Crear un libro de trabajo y agregar la hoja de trabajo
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reservations");

    // Escribir el archivo Excel
    XLSX.writeFile(workbook, "reservations.xlsx");

    console.log(`Archivo reservations.xlsx creado exitosamente.`);
    return response.json({
      message: "Archivo reservations.xlsx creado exitosamente.",
    });
  });
};
