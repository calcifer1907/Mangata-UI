import { config } from "dotenv";
config();

// export const PORT = process.env.PORT;
export const DB_HOST = process.env.PGHOST;
export const DB_USER = process.env.PGUSER;
export const DB_DATABASE = process.env.PGDATABASE;
export const DB_PASSWORD = process.env.PGPASSWORD;
export const DB_PORT = process.env.DB_PORT;
export const PAYMENT_TOKEN_TEST = process.env.PAYMENT_TOKEN_TEST;
export const PAYMENT_TOKEN_TEST_PUBLIC = process.env.PAYMENT_TOKEN_TEST_PUBLIC;
export const PAYMENT_TOKEN_PROD = process.env.PAYMENT_TOKEN_PROD;
export const PAYMENT_TOKEN_PROD_PUBLIC = process.env.PAYMENT_TOKEN_PROD_PUBLIC;
export const CALLBACK_URL = process.env.CALLBACK_URL;
export const BACKEND_URL = process.env.BACKEND_URL;
export const BOLD_KEY = process.env.BOLD_KEY;
export const BOLD_URL = process.env.BOLD_URL;
export const PASSWORD_EMAIL = process.env.PASSWORD_EMAIL;
export const USER_EMAIL = process.env.USER_EMAIL;
