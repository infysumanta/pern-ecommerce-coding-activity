const { Pool } = require("pg");
const config = require(".");

/* Creating a new pool of connections to the database. */
const pool = new Pool({
  user: config.DB_USER,
  password: config.DB_PASS,
  host: config.DB_HOST,
  port: config.DB_PORT,
  database: config.DB_NAME,
});

module.exports = pool;
