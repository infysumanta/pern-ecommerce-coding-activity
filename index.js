require("dotenv").config();
const config = require("./config");
const app = require("./app");

/* starts the server. on ports from config environment*/
app.listen(config.PORT, () => {
  console.log(`Server listening on ${config.PORT}`);
});
