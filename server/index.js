import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import pool from './controller/db.js';
import router from './routes/admin.js';
import loginRouter from './routes/login.js';
import productRouter from './routes/products.js';
import cartRouter from './routes/cart-routes.js';
import orderRouter from './routes/order-routes.js';

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Route middlewares
app.use('/api', router);
app.use('/api', loginRouter);
app.use('/api', productRouter);
app.use('/api', cartRouter);
app.use('/api', orderRouter);

// API endpoint to save cart data
app.post('/api/cart', (req, res) => {
  const { username, cartItems, totalAmount } = req.body;

  // Validate incoming data
  if (!username || !Array.isArray(cartItems) || typeof totalAmount !== 'number') {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  // Convert cartItems array to JSON string
  const cartItemsJSON = JSON.stringify(cartItems);

  // SQL INSERT statement
  const sql = `INSERT INTO cart_items (username, cart_items, total_amount) VALUES (?, ?, ?)`;

  // Execute the INSERT statement
  pool.query(sql, [username, cartItemsJSON, totalAmount], (err, result) => {
    if (err) {
      console.error('Error inserting cart data:', err);
      return res.status(500).json({ error: 'Error inserting cart data' });
    }
    console.log('Cart data inserted successfully');
    res.status(200).json({ message: 'Cart data inserted successfully' });
  });
});

// API endpoint to update cart items for a user
app.post('/api/user/cart', (req, res) => {
  const { email, cartItems } = req.body;

  // Validate incoming data
  if (!email || !Array.isArray(cartItems)) {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  const sql = 'UPDATE users SET cartItems = ? WHERE email = ?';
  pool.query(sql, [JSON.stringify(cartItems), email], (err, result) => {
    if (err) {
      console.error('Error updating cart items:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(200).json({ message: 'Cart items updated successfully' });
  });
});

// API endpoint to delete an item from cart
app.delete('/delete_from_cart', (req, res) => {
  const { email, product_id } = req.query;

  // Validate incoming data
  if (!email || !product_id) {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  const deleteQuery = `
    UPDATE users
    SET cartItems = JSON_REMOVE(cartItems, 
      JSON_UNQUOTE(REPLACE(JSON_SEARCH(cartItems, 'one', '${product_id}', null, '$[*].product_id'), '.product_id', '')))
    WHERE email = ?;
  `;

  pool.query(deleteQuery, [email], (err, result) => {
    if (err) {
      console.error('Error deleting item:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json({ message: `Item with productId ${product_id} deleted successfully from user with email ${email}` });
  });
});

// Save cart items endpoint
app.post('/save_cart_items', (req, res) => {
  const { email, username, cartItems, totalAmount } = req.body;

  // Validate incoming data
  if (!email || !username || !Array.isArray(cartItems) || typeof totalAmount !== 'number') {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  const cartItemsData = JSON.stringify(cartItems);
  const createdAt = new Date().toISOString();

  const insertQuery = `
    INSERT INTO cart_items (email, username, products, total_amount, created_at)
    VALUES (?, ?, ?, ?, ?);
  `;

  pool.query(insertQuery, [email, username, cartItemsData, totalAmount, createdAt], (err, result) => {
    if (err) {
      console.error('Error saving cart items:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json({ message: 'Cart items saved successfully' });
  });
});

// Clear cart items endpoint
app.post('/clear_cart_items', (req, res) => {
  const { email } = req.body;

  // Validate incoming data
  if (!email) {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  const updateQuery = `
    UPDATE users
    SET cartItems = '[]'
    WHERE email = ?;
  `;

  pool.query(updateQuery, [email], (err, result) => {
    if (err) {
      console.error('Error clearing cart items:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.json({ message: 'Cart items cleared successfully' });
  });
});

// API endpoint to count products in a user's cart
app.get('/user/productCount', (req, res) => {
  const { email } = req.query;

  // Validate incoming data
  if (!email) {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  const query = 'SELECT cartItems FROM users WHERE email = ?';
  pool.query(query, [email], (err, result) => {
    if (err) {
      console.error('Error fetching cart items:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (!result || result.length === 0 || !result[0].cartItems) {
      return res.status(404).json({ error: 'User not found or has no cart items' });
    }

    const cartItemsData = result[0].cartItems;
    const cartItems = JSON.parse(cartItemsData);
    const productCount = cartItems.length;

    res.status(200).json({ count: productCount });
  });
});

// API endpoint to store notification
app.post('/api/notifications', (req, res) => {
  const { username, email, message, status } = req.body;

  // Validate incoming data
  if (!username || !email || !message || !status) {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  const sql = `INSERT INTO notifications (username, email, message, status) VALUES (?, ?, ?, ?)`;
  pool.query(sql, [username, email, message, status], (err, result) => {
    if (err) {
      console.error('Error storing notification:', err);
      return res.status(500).json({ error: 'An error occurred while storing the notification.' });
    }
    res.status(200).json({ message: 'Notification stored successfully' });
  });
});

// API endpoint to fetch notifications
app.get('/api/notifications', (req, res) => {
  const { email } = req.query;

  // Validate incoming data
  if (!email) {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  const query = 'SELECT * FROM notifications WHERE email = ?';
  pool.query(query, [email], (err, results) => {
    if (err) {
      console.error('Error fetching notifications:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(results);
  });
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
