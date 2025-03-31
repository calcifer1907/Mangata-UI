import { pool } from "../Connection";
import { ISumCommission, IListBanks } from "../interfaces/IUSers";

class SocioRepository {
  async sumCommission(id_employee: number): Promise<ISumCommission> {
    const SQL_SUM_COMMISSION = `SELECT SUM(COMMISSION_EMPLOYEE  - CURRENT_COMMISSION) AS sum_commission FROM 
                                reservations WHERE PAY = false AND STATUS_RESERVATION = 'approved' AND ID_EMPLOYEE=$1;`;

    const { rows } = await pool.query(SQL_SUM_COMMISSION, [id_employee]);
    return rows[0] || { sum_commission: 0 };
  }

  async getListBanks(): Promise<IListBanks[]> {
    const SQL_QUERY = "SELECT * FROM banks;";
    const { rows } = await pool.query(SQL_QUERY);
    return rows;
  }
}

export default new SocioRepository();
