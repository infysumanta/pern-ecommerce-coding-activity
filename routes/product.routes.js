const express = require("express");
const { productController } = require("./../controller");

const router = express.Router();

router.route("/").get(productController.getAllProduct);

module.exports = router;
