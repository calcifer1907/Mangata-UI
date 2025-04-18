import { createECDH } from "crypto";
import { pool } from "../Connection";
import {
  IBodyBlockDay,
  ISaveCodeReservation,
} from "../interfaces/IReservation";

class ReservationRepository {
  async saveCodeReservation(values: ISaveCodeReservation): Promise<boolean> {
    const SQL_QUERY = ` INSERT INTO save_generate_codes_reservation 
                            (id, code_generate,min_price, agreed_price, created_at)
                                VALUES ($1, $2, $3, $4, $5) ON CONFLICT (id)
                                DO UPDATE SET code_generate = EXCLUDED.code_generate,min_price = EXCLUDED.min_price, 
                                agreed_price = EXCLUDED.agreed_price, created_at = EXCLUDED.created_at`;

    const { id, code, min_price, agreed_price, created_at } = values;
    const { rowCount } = await pool.query(SQL_QUERY, [
      id,
      code,
      min_price,
      agreed_price,
      created_at,
    ]);
    if (rowCount === 0)
      throw new Error("No se pudo guardar el código de reserva");
    return true;
  }

  async getLunches() {
    try {
      const { rows } = await pool.query("SELECT ID,DESCRIPTION FROM lunches;");
      return rows;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }

  async getCodeReservation(code: string): Promise<ISaveCodeReservation> {
    const { rows, rowCount } = await pool.query(
      "SELECT * FROM save_generate_codes_reservation WHERE CODE_GENERATE=$1;",
      [code]
    );
    if (rowCount === 0) throw new Error("No se encontró el código de reserva");
    return rows[0] as ISaveCodeReservation;
  }

  async updatePayment(id: string, pay: boolean): Promise<boolean> {
    const { rowCount } = await pool.query(
      "UPDATE reservations SET PAY=$1 WHERE CODE_RESERVATION=$2;",
      [pay, id]
    );
    return (rowCount ?? 0) > 0;
  }

  async changeStatus(id: string, status: string): Promise<boolean> {
    const { rowCount } = await pool.query(
      "UPDATE reservations SET STATUS_RESERVATION=$1 WHERE CODE_RESERVATION=$2;",
      [status, id]
    );
    return (rowCount ?? 0) > 0;
  }

  async isBlockedDay(): Promise<IBodyBlockDay[]> {
    const { rows } = await pool.query(
      "SELECT id,TO_CHAR(valid_date AT TIME ZONE 'UTC', 'YYYY/MM/DD') as valid_date FROM is_block_day;"
    );
    return rows;
  }
}

export default new ReservationRepository();
