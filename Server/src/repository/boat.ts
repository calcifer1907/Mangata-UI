import e from "express";
import { pool } from "../Connection";
import { IBlockCalendar } from "../interfaces/IBoat";

class BoatRepository {
  async blockCalendar(currentDate: string): Promise<IBlockCalendar[]> {
    const SQL_BLOCK_CALENDAR = `SELECT TO_CHAR(created_at AT TIME ZONE 'UTC', 'YYYY/MM/DD') as valid_date from reservations WHERE ID_EMPLOYEE = 30 AND CREATED_AT >= $1;`;
    const { rows } = await pool.query(SQL_BLOCK_CALENDAR, [currentDate]);
    return rows;
  }
}

export default new BoatRepository();
