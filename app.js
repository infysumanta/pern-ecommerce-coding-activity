const express = require("express");
const cors = require("cors");
const logger = require("morgan");

const app = express();

app.use(express.json());
app.use(cors());
app.use(logger("common"));

app.use("/api", require("./routes/routes"));

module.exports = app;
