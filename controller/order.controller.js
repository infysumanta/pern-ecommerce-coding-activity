const pool = require("./../config/db");

const getALLOrder = async (_req, res) => {
  try {
    const orders = await pool.query("SELECT * FROM orders");
    res.json(orders.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong!!",
    });
  }
};

const saveOrder = async (req, res) => {
  try {
    const { orderDescription, productId } = req.body;
    const newOrder = await pool.query(
      "INSERT INTO orders(orderDescription, createdAt) VALUES ($1, $2) RETURNING *",
      [orderDescription, new Date()]
    );
    const productOrderMap = await pool.query(
      "INSERT INTO OrderProductMap(orderId,productId) VALUES ($1, $2) RETURNING *",
      [newOrder.rows[0].id, productId]
    );
    res.json("Order Created");
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong!!",
    });
  }
};

const getSingleOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await pool.query("SELECT * FROM orders WHERE id = $1", [id]);
    res.json(order.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong!!",
    });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    await pool.query("UPDATE orders SET orderDescription = $1 WHERE id = $2", [
      description,
      id,
    ]);

    res.json("Todo was updated!");
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong!!",
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM orders WHERE id = $1", [id]);
    res.json("Todo was deleted!");
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong!!",
    });
  }
};

module.exports = {
  getALLOrder,
  saveOrder,
  getSingleOrder,
  updateOrder,
  deleteOrder,
};
