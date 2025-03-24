import { pool } from "../Connection";

class ReservationRepository {
  async saveCodeReservation(
    id: number,
    code: string,
    min_price: number,
    agreed_price: number,
    created_at: string
  ): Promise<any> {
    const SQL_QUERY = ` INSERT INTO save_generate_codes_reservation 
                            (id, code_generate,min_price, agreed_price, created_at)
                                VALUES ($1, $2, $3, $4, $5) ON CONFLICT (id)
                                DO UPDATE SET code_generate = EXCLUDED.code_generate,min_price = EXCLUDED.min_price, 
                                agreed_price = EXCLUDED.agreed_price, created_at = EXCLUDED.created_at`;
    try {
      const { rows } = await pool.query(SQL_QUERY, [
        id,
        code,
        min_price,
        agreed_price,
        created_at,
      ]);
      return rows;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }

  async getLunches() {
    try {
      const { rows } = await pool.query("SELECT ID,DESCRIPTION FROM lunches;");
      return rows;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }
}

export default new ReservationRepository();
