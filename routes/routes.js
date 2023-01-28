const express = require("express");

const router = express.Router();

router.use("/products", require("./product.routes"));
router.use("/orders", require("./order.routes"));

module.exports = router;
