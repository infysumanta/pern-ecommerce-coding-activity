require("dotenv").config();
const config = require("./config");
const app = require("./app");

app.listen(config.PORT, () => {
  console.log(`Server listening on ${config.PORT}`);
});
