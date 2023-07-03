const { config } = require("dotenv");

config();

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3001;
const DB_HOST = process.env.DB_HOST ?? null;
const DB_PASS = process.env.DB_PASS ?? null;
const DATABASE = process.env.DATABASE ?? null;
const DB_USER = process.env.DB_USER ?? null;

module.exports = {
  PORT: PORT,
  DB_HOST: DB_HOST,
  DB_PASS: DB_PASS,
  DATABASE: DATABASE,
  DB_USER: DB_USER,
};
