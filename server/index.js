import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import router from './routes/admin.js';
import loginRouter from './routes/login.js';
import productRouter from './routes/products.js';
import cartRouter from './routes/cart-routes.js';
import orderRouter from './routes/order-routes.js';
import pool from './controller/db.js';

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

// Route middlewares
app.use('/api', router);
app.use(loginRouter);
app.use('/api', productRouter);
app.use(cartRouter);
app.use(orderRouter);


// API endpoint to save cart data
app.post('/api/cart', (req, res) => {
  const userData = req.body;

  // Convert cartItems array to JSON string
  const cartItemsJSON = JSON.stringify(userData.cartItems);

  // SQL INSERT statement
  const sql = `INSERT INTO cart_items (username, cart_items, total_amount) VALUES (?, ?, ?)`;

  // Execute the INSERT statement
  pool.query(sql, [userData.username, cartItemsJSON, userData.totalAmount], (err, result) => {
    if (err) {
      console.error('Error inserting cart data:', err);
      res.status(500).json({ error: 'Error inserting cart data' });
    } else {
      console.log('Cart data inserted successfully');
      res.status(200).json({ message: 'Cart data inserted successfully' });
    }
  });
});


app.post('/api/user/cart', (req, res) => {
  try {
    const { email, cartItems } = req.body;

    // Update the cartItems for the user in the database
    const sql = 'UPDATE users SET cartItems = ? WHERE email = ?';
    pool.query(sql, [JSON.stringify(cartItems), email]);

    res.status(200).json({ message: 'Cart items updated successfully' });
  } catch (error) {
    console.error('Error updating cart items:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/delete_from_cart', (req, res) => {
  const { email, product_id } = req.query; // Adjusted to use product_id

  console.log('Received productId:', product_id); // Changed to product_id

  try {
    // Query to delete the specific item with productId from the cartItems JSON
    const deleteQuery = `
      UPDATE users
      SET cartItems = JSON_REMOVE(cartItems, 
        JSON_UNQUOTE(REPLACE(JSON_SEARCH(cartItems, 'one', '${product_id}', null, '$[*].product_id'), '.product_id', '')))
      WHERE email = '${email}';
    `;

    pool.query(deleteQuery);

    res.json({ message: `Item with productId ${product_id} deleted successfully from user with email ${email}` });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Save cart items endpoint
app.post('/save_cart_items', (req, res) => {
  const { email, username, cartItems, totalAmount } = req.body;

  // Validate incoming data
  if (!email || !username || !Array.isArray(cartItems) || typeof totalAmount !== 'number') {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  try {
    const cartItemsData = JSON.stringify(cartItems);
    const createdAt = new Date().toISOString();

    const insertQuery = `
      INSERT INTO cart_items (email, username, products, total_amount, created_at)
      VALUES (?, ?, ?, ?, ?);
    `;

    console.log('Executing query:', insertQuery, [email, username, cartItemsData, totalAmount, createdAt]);
    pool.query(insertQuery, [email, username, cartItemsData, totalAmount, createdAt]);

    res.json({ message: 'Cart items saved successfully' });
  } catch (error) {
    console.error('Error saving cart items:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Clear cart items endpoint
app.post('/clear_cart_items', (req, res) => {
  const { email } = req.body;

  // Validate incoming data
  if (!email) {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  try {
    const updateQuery = `
      UPDATE users
      SET cartItems = '[]'
      WHERE email = ?;
    `;

    console.log('Executing query:', updateQuery, [email]);
    pool.query(updateQuery, [email]);

    res.json({ message: 'Cart items cleared successfully' });
  } catch (error) {
    console.error('Error clearing cart items:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/user/productCount', async (req, res) => {
  try {
    const { email } = req.query;

    // Execute SQL query to retrieve the cartItems data for the user
    const query = 'SELECT cartItems FROM users WHERE email = ?';
    pool.query(query, [email], (err, result) => {
      if (err) {
        console.error('Error fetching cart items:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (!result || result.length === 0 || !result[0].cartItems) {
        return res.status(404).json({ error: 'User not found or has no cart items' });
      }


      // Extract cartItems array from the result
      const cartItemsData = result[0].cartItems;

      // Parse the cartItems JSON data
      const cartItems = JSON.parse(cartItemsData);

      // Count the number of products
      const productCount = cartItems.length;

      // Send the product count as a JSON response
      res.status(200).json({ count: productCount });
    });
  } catch (error) {
    console.error('Error counting products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// API endpoint to store notification
app.post('/api/notifications', (req, res) => {
  const { username, email, message, status } = req.body;

  const sql = `INSERT INTO notifications (username, email, message, status) VALUES (?, ?, ?, ?)`;
  pool.query(sql, [username, email, message, status], (err, result) => {
    if (err) {
      console.error('Error storing notification:', err);
      res.status(500).json({ error: 'An error occurred while storing the notification.' });
    } else {
      console.log('Notification stored successfully');
      res.status(200).json({ message: 'Notification stored successfully' });
    }
  });
});

app.get("/api/notifications", (req, res) => {
  const { email } = req.query;

  // SQL query to fetch notifications for the provided email
  const query = "SELECT * FROM notifications WHERE email = ?";

  // Execute the SQL query with the provided email parameter
  pool.query(query, [email], (err, results) => {
    if (err) {
      console.error("Error fetching notifications:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.json(results); // Send fetched notifications as JSON response
  });
});

// Start the server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
