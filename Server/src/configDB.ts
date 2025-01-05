import { config } from "dotenv";
config();

// export const PORT = process.env.PORT;
export const DB_HOST = process.env.PGHOST;
export const DB_USER = process.env.PGUSER;
export const DB_DATABASE = process.env.PGDATABASE;
export const DB_PASSWORD = process.env.PGPASSWORD;
export const DB_PORT = process.env.DB_PORT;
