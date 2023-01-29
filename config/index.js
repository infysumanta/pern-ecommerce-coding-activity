/* Created a Constant Instance of Environment Variable */
module.exports = {
  PORT: process.env.PORT || 5000,
  DB_USER: process.env.DB_USER || "postgres",
  DB_PASS: process.env.DB_PASS || "sumanta",
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PORT: process.env.DB_PORT || 5432,
  DB_NAME: process.env.DB_NAME || "ecommerce",
  NODE_ENV: process.env.NODE_ENV || "development",
};
