const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const path = require("path");
const config = require("./config");
/* Creating an instance of the express application. */
const app = express();

/* Middleware */
app.use(express.json());
app.use(cors());
app.use(logger("common"));
app.use(express.static(path.join(__dirname, "client", "build")));

/* Telling the server to use the routes in the routes folder. */
app.use("/api", require("./routes/routes"));
if (config.NODE_ENV !== "development") {
  app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

module.exports = app;
