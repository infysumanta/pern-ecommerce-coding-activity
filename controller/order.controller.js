const pool = require("./../config/db");

const getALLOrder = async (req, res) => {
  try {
    const { search } = req.query;

    let query =
      "SELECT orders.id as orderid, orders.orderdescription as orderdescription, orders.createdat as createdat, count(*) as productcount from orders INNER JOIN OrderProductMap ON orders.id = OrderProductMap.orderId INNER JOIN products ON products.id = OrderProductMap.productId";
    if (search.length > 0) {
      query =
        query +
        ` WHERE orderdescription LIKE '%${search}%' or orders.id::text like '%${search}%' `;
    }
    query +=
      " GROUP BY orders.id, orders.orderdescription, orders.createdat ORDER BY orders.id";
    const orders = await pool.query(query);

    // console.log(orders.rows);

    let ordersArray = orders.rows.map((order) => {
      return {
        id: order.orderid,
        description: order.orderdescription,
        productCount: order.productcount,
        createdAt: order.createdat,
      };
    });
    res.json(ordersArray);
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

    let query =
      "SELECT orders.id as orderid, orders.orderdescription as orderdescription, orders.createdat as createdat, products.id as productid, products.productname as productname, products.productdescription as productdescription FROM orders INNER JOIN OrderProductMap ON orders.id = OrderProductMap.orderId INNER JOIN products ON products.id = OrderProductMap.productId WHERE orders.id = $1";

    const order = await pool.query(query, [id]);

    let products = [];
    order.rows.forEach((product) => {
      products.push({
        id: product.productid,
        name: product.productname,
        description: product.productdescription,
      });
    });

    const orderData = {
      id: order.rows[0].orderid,
      description: order.rows[0].orderdescription,
      createdAt: order.rows[0].createdat,
      products: products,
    };

    res.json(orderData);
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
    const { orderDescription, products } = req.body;
    const orderedProduct = JSON.parse(products);
    if (orderedProduct.length <= 0) {
      return res.status(500).json({
        success: false,
        message: "Please choose at-least one product to create Order!",
      });
    }
    await pool.query("UPDATE orders SET orderDescription = $1 WHERE id = $2", [
      orderDescription,
      id,
    ]);

    let productIdArray = orderedProduct.map(({ id }) => id);

    await pool.query(
      `DELETE FROM orderproductmap WHERE orderId = ${id} AND productId NOT IN (${productIdArray.toString()})`
    );

    await orderedProduct.map(async (product) => {
      const query = `SELECT * FROM orderproductmap WHERE orderId = ${id} AND productId = ${product.id}`;
      const checked = await pool.query(query);
      if (!Boolean(checked.rows[0])) {
        await pool.query(
          "INSERT INTO OrderProductMap(orderId,productId) VALUES ($1, $2) RETURNING *",
          [id, product.id]
        );
      }
    });

    return res.status(200).json({
      success: true,
      message: "Order updated successfully",
    });
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
