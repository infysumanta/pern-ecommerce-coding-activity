const pool = require("./../config/db");
exports.getAllProduct = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM products");
    let products = [];
    results.rows.forEach((product) => {
      products.push({
        id: product.id,
        name: product.productname,
        description: product.productdescription,
        checked: false,
      });
    });
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong!!",
    });
  }
};

exports.getAllProductByOrderId = async (req, res) => {
  try {
    const { orderId } = req.params;
    const results = await pool.query("SELECT * FROM products");

    let products = [];
    for (let i = 0; i < results.rows.length; i++) {
      const query = `SELECT * FROM orderproductmap WHERE orderId = ${orderId} AND productId = ${results.rows[i].id}`;
      const isChecked = await pool.query(query);
      products.push({
        id: results.rows[i].id,
        name: results.rows[i].productname,
        description: results.rows[i].productdescription,
        checked: Boolean(isChecked.rows[0]),
      });
    }

    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong!!",
    });
  }
};
