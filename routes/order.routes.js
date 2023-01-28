const express = require("express");
const { orderController } = require("./../controller");
const router = express.Router();

router
  .route("/")
  .get(orderController.getALLOrder)
  .post(orderController.saveOrder);
router
  .route("/:id")
  .get(orderController.getSingleOrder)
  .put(orderController.updateOrder)
  .delete(orderController.deleteOrder);

module.exports = router;
