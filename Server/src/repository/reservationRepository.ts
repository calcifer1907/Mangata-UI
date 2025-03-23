import { pool } from "../Connection";

interface ISumCommission {
  sum_commission: number;
}

class ReservationRepository {
  async saveCodeReservation(id: number, code: string): Promise<any> {
    const SQL_QUERY = ` INSERT INTO save_generate_codes_reservation (id, code_generate)
                                VALUES ($1, $2)
                                ON CONFLICT (id)
                                DO UPDATE SET code_generate = EXCLUDED.code_generate`;
    try {
      const { rows } = await pool.query(SQL_QUERY, [id, code]);
      return rows;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }
}

export default new ReservationRepository();
