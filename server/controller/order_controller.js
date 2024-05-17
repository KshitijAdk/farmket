import pool from "./db.js";

export const getOrderHistory = (req, res) => {
  try {
    const { username } = req.query; // Destructure username from req.body
    const sql = 'SELECT products, total_amount, DATE_FORMAT(created_at, "%Y-%m-%d") AS orderDate FROM cart_items WHERE username = ?';
    pool.query(sql, [username], (err, result) => {
      if (err) {
        console.error('Error fetching cart items:', err);
        res.status(500).send('Error fetching cart items');
      } else {
        if (result.length > 0) {
          const cartItems = result.map(row => {
            return {
              cartItems: JSON.parse(row.products),
              totalAmount: row.total_amount,
              orderDate: row.orderDate
            };
          });
          res.status(200).json(cartItems);
        } else {
          res.status(404).json({ error: 'Cart items not found for the user' });
        }
      }
    });
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).send('Error fetching cart items');
  }
}

export const deleteOrderProducts = (req, res) => {
  const { productId, username } = req.query;

  console.log("Username:", username);
  console.log("Deleted ProductId:", productId);

  // Check if productId is provided
  if (!productId) {
    res.status(400).json({ message: 'ProductId must be provided' });
    return;
  }

  const sqlSelect = `SELECT * FROM cart_items WHERE username = ?`;
  pool.query(sqlSelect, [username], (error, results, fields) => {
    if (error) {
      console.error('Error executing MySQL query: ' + error.message);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const cartItems = JSON.parse(results[0].products);

    // Filter out the item with productId
    const updatedProducts = cartItems.filter(product => product.product_id.toString() !== productId);

    const updatedProductsJSON = JSON.stringify(updatedProducts);

    const sqlUpdate = `UPDATE cart_items SET products = ? WHERE username = ?`;

    if (updatedProducts.length === 0) {
      // If updatedProducts is empty, delete the row
      const sqlDelete = `DELETE FROM cart_items WHERE username = ?`;
      pool.query(sqlDelete, [username], (error, results, fields) => {
        if (error) {
          console.error('Error executing MySQL query: ' + error.message);
          res.status(500).json({ message: 'Internal server error' });
          return;
        }
        res.status(200).json({ message: 'Product deleted successfully' });
      });
    } else {
      // Update the products column
      pool.query(sqlUpdate, [updatedProductsJSON, username], (error, results, fields) => {
        if (error) {
          console.error('Error executing MySQL query: ' + error.message);
          res.status(500).json({ message: 'Internal server error' });
          return;
        }
        res.status(200).json({ message: 'Product deleted successfully' });
      });
    }
  });
}



export const updateTotalPrice = (req, res) => {
  try {
    // Extract username and new total amount from request body
    const { username, totalPrice } = req.body;

    // Update the total amount in the database
    const sqlUpdate = `UPDATE cart_items SET total_amount = ? WHERE username = ?`;
    pool.query(sqlUpdate, [totalPrice, username]);

    // Send success response
    res.status(200).json({ message: 'Total amount updated successfully' });
  } catch (error) {
    console.error('Error updating total amount:', error);
    // Send error response
    res.status(500).json({ message: 'Internal server error' });
  }
}