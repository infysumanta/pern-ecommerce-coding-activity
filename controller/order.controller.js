const pool = require("./../config/db");

const getALLOrder = async (req, res) => {
  try {
    const { search } = req.query;

    let query =
      "SELECT orders.* FROM orders INNER JOIN OrderProductMap ON orders.id = OrderProductMap.orderId INNER JOIN products ON products.id = OrderProductMap.productId";
    if (search.length > 0) {
      query =
        query +
        ` WHERE orderdescription LIKE '%${search}%' or orders.id::text like '%${search}%' `;
    }
    console.log(query);
    const orders = await pool.query(query);
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
    const { orderDescription, products } = req.body;
    const orderedProduct = JSON.parse(products);
    if (orderedProduct.length <= 0) {
      return res.status(500).json({
        success: false,
        message: "Please choose at-least one product to create Order!",
      });
    }

    const newOrder = await pool.query(
      "INSERT INTO orders(orderDescription, createdAt) VALUES ($1, $2) RETURNING *",
      [orderDescription, new Date()]
    );
    await orderedProduct.map(async (prod) => {
      await pool.query(
        "INSERT INTO OrderProductMap(orderId,productId) VALUES ($1, $2) RETURNING *",
        [newOrder.rows[0].id, prod.id]
      );
    });

    return res.status(200).json({
      success: true,
      message: "Order created successfully",
    });
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
    await pool.query("DELETE FROM orders WHERE id = $1 RETURNING *", [id]);

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
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
