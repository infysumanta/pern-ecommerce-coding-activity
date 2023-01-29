const pool = require("./../config/db");
/**
 * It gets all the products from the database and returns them as a JSON object.
 * @param req - The request object.
 * @param res - The response object.
 * @return The return value is an array of objects.
 */
const getAllProduct = async (req, res) => {
  try {
    /* Getting all the products from the database. */
    const results = await pool.query("SELECT * FROM products");
    /* Creating an array of objects. */
    let products = [];
    results.rows.forEach((product) => {
      products.push({
        id: product.id,
        name: product.productname,
        description: product.productdescription,
        checked: false,
      });
    });
    /* Sending the response back to the client. */
    res.json(products);
  } catch (error) {
    /* Returning a JSON object with a error message. */
    res.status(500).json({
      success: false,
      message: "Something went wrong!!",
    });
  }
};

/**
 * It gets all the products from the database and checks if the product is checked or not
 * @param req - The request object.
 * @param res - The response object.
 * @return The return value is an array of objects.
 */
const getAllProductByOrderId = async (req, res) => {
  try {
    /* Destructuring the orderId from the req.params object. */
    const { orderId } = req.params;
    /* Getting all the products from the database. */
    const results = await pool.query("SELECT * FROM products");

    /* Checking if the product is checked or not. */
    let products = [];
    for (let i = 0; i < results.rows.length; i++) {
      const query = `SELECT * FROM orderproductmap WHERE orderId = ${orderId} AND productId = ${results.rows[i].id}`;
      const isChecked = await pool.query(query);
      /* Pushing the product object into the products array. */
      products.push({
        id: results.rows[i].id,
        name: results.rows[i].productname,
        description: results.rows[i].productdescription,
        checked: Boolean(isChecked.rows[0]),
      });
    }

    /* Sending the response back to the client. */
    res.json(products);
  } catch (error) {
    /* Returning a JSON object with a error message. */
    res.status(500).json({
      success: false,
      message: "Something went wrong!!",
    });
  }
};

module.exports = {
  getAllProduct,
  getAllProductByOrderId,
};
