import { pool } from "../Connection";

export const dataSendEmail = async (payment_id: string) => {
  try {
    const QUERY =
      "SELECT TO_CHAR(CREATED_AT AT TIME ZONE 'UTC', 'YYYY-MM-DD') AS FORMATTED_DATE, EMAIL,ID_EMPLOYEE, CURRENT_COMMISSION,CODE_RESERVATION FROM reservations WHERE PAYMENT_ID = $1";

    const { rows, rowCount } = await pool.query(QUERY, [payment_id]);

    if (rowCount && rows.length > 0) {
      const [resultData] = rows;

      if (resultData.id_employee === "30" || resultData.id_employee === 30) {
        const nameClient = await findNameClient(resultData.code_reservation);
        return {
          ...resultData,
          clientName: nameClient,
        };
      }

      return resultData;
    }
    return null;
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
};

const findNameClient = async (code_reservation: string): Promise<string> => {
  const QUERY_NAME_CLIENT =
    "SELECT NAME_ACCOMPANIST FROM accompanist WHERE ID_RESERVATION = $1";
  const { rows, rowCount } = await pool.query(QUERY_NAME_CLIENT, [
    code_reservation,
  ]);
  if (!rowCount || rows.length === 0) {
    return "";
  }
  return rows[0].name_accompanist ?? "";
};
