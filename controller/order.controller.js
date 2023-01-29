const pool = require("./../config/db");

/**
 * It gets all the orders from the database and returns them in a JSON format
 * @param req - The request object.
 * @param res - The response object.
 * @return {success, message} - The Json Object
 */
const getALLOrder = async (req, res) => {
  try {
    /* Destructuring the search query from the request object. */
    const { search } = req.query;

    let query =
      "SELECT orders.id as orderid, orders.orderdescription as orderdescription, orders.createdat as createdat, count(*) as productcount from orders INNER JOIN OrderProductMap ON orders.id = OrderProductMap.orderId INNER JOIN products ON products.id = OrderProductMap.productId";
    /* Checking if the search query is not empty. If it is not empty, then it is adding the search query
   to the query. */
    if (search.length > 0) {
      query =
        query +
        ` WHERE orderdescription LIKE '%${search}%' or orders.id::text like '%${search}%' `;
    }
    query +=
      " GROUP BY orders.id, orders.orderdescription, orders.createdat ORDER BY orders.id";
    /* Executing the query and storing the result in the orders variable. */
    const orders = await pool.query(query);

    /* Creating a new array of objects from the orders array. */
    let ordersArray = orders.rows.map((order) => {
      return {
        id: order.orderid,
        description: order.orderdescription,
        productCount: order.productcount,
        createdAt: order.createdat,
      };
    });
    /* Returning the ordersArray as a JSON object. */
    res.json(ordersArray);
  } catch (error) {
    /* Returning a JSON object with a error message. */
    res.status(500).json({
      success: false,
      message: "Something went wrong!!",
    });
  }
};

/**
 * It takes an order description and a list of products, creates an order, and then creates a mapping
 * between the order and the products.
 * </code>
 * @param req - The request object.
 * @param res - The response object.
 * @returns {success, message}  The return value is an array of objects.
 */
const saveOrder = async (req, res) => {
  try {
    const { orderDescription, products } = req.body;
    const orderedProduct = JSON.parse(products);
    /* Checking if the user has selected at least one product to create an order. */
    if (orderedProduct.length <= 0) {
      return res.status(500).json({
        success: false,
        message: "Please choose at-least one product to create Order!",
      });
    }

    /* Inserting a new order into the database. */
    const newOrder = await pool.query(
      "INSERT INTO orders(orderDescription, createdAt) VALUES ($1, $2) RETURNING *",
      [orderDescription, new Date()]
    );
    /* Inserting the order and product mapping into the database. */
    await orderedProduct.map(async (prod) => {
      await pool.query(
        "INSERT INTO OrderProductMap(orderId,productId) VALUES ($1, $2) RETURNING *",
        [newOrder.rows[0].id, prod.id]
      );
    });

    /* Returning a JSON object with a success message. */
    return res.status(200).json({
      success: true,
      message: "Order created successfully",
    });
  } catch (error) {
    /* Returning a JSON object with a error message. */
    res.status(500).json({
      success: false,
      message: "Something went wrong!!",
    });
  }
};

/**
 * It gets a single order from the database and returns it as a JSON object
 * @param req - The request object.
 * @returns The return value is an array of objects.
 * @param res - response object
 */
const getSingleOrder = async (req, res) => {
  try {
    /* Destructuring the id from the request object. */
    const { id } = req.params;

    /* Getting the order from the database. */
    let query =
      "SELECT orders.id as orderid, orders.orderdescription as orderdescription, orders.createdat as createdat, products.id as productid, products.productname as productname, products.productdescription as productdescription FROM orders INNER JOIN OrderProductMap ON orders.id = OrderProductMap.orderId INNER JOIN products ON products.id = OrderProductMap.productId WHERE orders.id = $1";
    const order = await pool.query(query, [id]);

    /* Creating a new array of objects from the order.rows array. */
    let products = [];
    order.rows.forEach((product) => {
      products.push({
        id: product.productid,
        name: product.productname,
        description: product.productdescription,
      });
    });

    /* Creating a new object from the order object. */
    const orderData = {
      id: order.rows[0].orderid,
      description: order.rows[0].orderdescription,
      createdAt: order.rows[0].createdat,
      products: products,
    };

    /* Returning the orderData object as a JSON object. */
    res.json(orderData);
  } catch (error) {
    /* Returning a JSON object with a error message. */
    res.status(500).json({
      success: false,
      message: "Something went wrong!!",
    });
  }
};

/**
 * It updates the order description and the products in the order.
 * @param req - {
 * @param res - response object
 * @returns {success, message}  The return value is the number of rows affected by the query.
 */
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

/**
 * It deletes an order from the database
 * @param req - The request object.
 * @param res - The response object.
 * @returns {success, message}  The return JSON Object.
 */
const deleteOrder = async (req, res) => {
  try {
    /* Destructuring the id from the request object. */
    const { id } = req.params;
    /* Deleting the order from the database. */
    await pool.query("DELETE FROM orders WHERE id = $1 RETURNING *", [id]);

    /* Returning a JSON object with a success message. */
    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    /* Returning a JSON object with a error message. */
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
