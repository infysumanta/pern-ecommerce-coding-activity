const express = require("express");
const cors = require("cors");
const logger = require("morgan");

/* Creating an instance of the express application. */
const app = express();

/* Middleware */
app.use(express.json());
app.use(cors());
app.use(logger("common"));

/* Telling the server to use the routes in the routes folder. */
app.use("/api", require("./routes/routes"));

module.exports = app;
