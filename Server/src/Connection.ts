// import { createPool } from "mysql2/promise";
import pg from "pg";

import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from "./configDB";

// export const pool = createPool({
//   host: DB_HOST,
//   user: DB_USER,
//   password: DB_PASSWORD,
//   port: DB_PORT,
//   database: DB_DATABASE,
// });

export const pool = new pg.Pool({
  host: DB_HOST,
  database: DB_DATABASE,
  user: DB_USER,
  password: DB_PASSWORD,
  port: DB_PORT,
});

// const getGpVersion = async () => {
//   const client = await pool.connect();
//   try {
//     const result = await client.query("SELECT version()");
//     console.log("Version: ", result.rows[0]);
//   } finally {
//     client.release();
//   }
// };

// getGpVersion();
