import { pool } from "../Connection";
import { ISaveCodeReservation } from "../interfaces/IReservation";

class ReservationRepository {
  async saveCodeReservation(values: ISaveCodeReservation[]): Promise<boolean> {
    const SQL_QUERY = ` INSERT INTO save_generate_codes_reservation 
                            (id, code_generate,min_price, agreed_price, created_at)
                                VALUES ($1, $2, $3, $4, $5) ON CONFLICT (id)
                                DO UPDATE SET code_generate = EXCLUDED.code_generate,min_price = EXCLUDED.min_price, 
                                agreed_price = EXCLUDED.agreed_price, created_at = EXCLUDED.created_at`;
    try {
      const { rowCount } = await pool.query(SQL_QUERY, [values]);
      if (rowCount === 0)
        throw new Error("Error: No se pudo guardar el código de reserva");
      return true;
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

  async getCodeReservation(code: string): Promise<ISaveCodeReservation> {
    try {
      const { rows, rowCount } = await pool.query(
        "SELECT * FROM save_generate_codes_reservation WHERE CODE_GENERATE=$1;",
        [code]
      );
      if (rowCount === 0)
        throw new Error("Error: No se encontró el código de reserva");
      return rows[0] as ISaveCodeReservation;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }
}

export default new ReservationRepository();
