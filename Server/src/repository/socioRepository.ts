import { pool } from "../Connection";

interface ISumCommission {
  sum_commission: number;
}

class SocioRepository {
  async sumCommission(id_employee: number): Promise<ISumCommission> {
    const SQL_SUM_COMMISSION = `SELECT SUM(COMMISSION_EMPLOYEE  - CURRENT_COMMISSION) AS sum_commission FROM 
                                reservations WHERE PAY = false AND STATUS_RESERVATION = 'approved' AND ID_EMPLOYEE=$1;`;
    try {
      const { rows } = await pool.query(SQL_SUM_COMMISSION, [id_employee]);
      return rows[0] || { sum_commission: 0 };
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }
}

export default new SocioRepository();
