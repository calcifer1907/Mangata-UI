"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DB_USER = exports.DB_PORT = exports.DB_PASSWORD = exports.DB_HOST = exports.DB_DATABASE = void 0;
var _dotenv = require("dotenv");
(0, _dotenv.config)();

// export const PORT = process.env.PORT;
var DB_HOST = exports.DB_HOST = process.env.PGHOST;
var DB_USER = exports.DB_USER = process.env.PGUSER;
var DB_DATABASE = exports.DB_DATABASE = process.env.PGDATABASE;
var DB_PASSWORD = exports.DB_PASSWORD = process.env.PGPASSWORD;
var DB_PORT = exports.DB_PORT = process.env.DB_PORT;