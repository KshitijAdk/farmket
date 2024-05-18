import pool from "./db";

export const getUserCartItems = (req, res) => {
    try {
        // Extract email from request body
        const { email } = req.query;

        // Fetch cartItems of the user from the database
        pool.query(
            'SELECT cartItems FROM users WHERE email = ?',
            [email],
            (error, results) => {
                if (error) {
                    console.error('Error fetching cart items:', error);
                    res.status(500).json({ error: 'Internal server error.' });
                    return;
                }

                if (results.length > 0) {
                    const cartItems = JSON.parse(results[0].cartItems);
                    if (cartItems) {
                        res.status(200).json({ cartItems });
                    } else {
                        res.status(200).json({ message: 'Your cart is empty.' });
                    }
                } else {
                    // User not found or cartItems column is empty
                    res.status(404).json({ message: 'User not found or cart is empty.' });
                }
            }
        );
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};




export const deleteCartItems = (req, res) => {
    try {
        // Extract product ID from request parameters
        const productId = req.params.id;

        // Create SQL query to delete product from cart by ID
        const sql = `DELETE FROM cart WHERE id = ?`;

        // Execute the query
        pool.query(sql, [productId], (error, results) => {
            if (error) {
                console.error('Error deleting product from cart:', error);
                res.status(500).json({ error: 'Internal server error.' });
                return;
            }
            console.log('Product deleted from cart successfully');
            res.status(200).json({ message: 'Product deleted from cart successfully.' });
        });
    } catch (error) {
        console.error('Error deleting product from cart:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}


export const getCartItemsByUsername = (req, res) => {
    try {
        // Extract username from query parameters
        const { username } = req.query;

        // Check if username is provided
        if (!username) {
            return res.status(400).json({ error: "Username is required." });
        }

        // Create SQL query to fetch cart items for the specified username
        const sql = `SELECT * FROM cart WHERE username = ?`;
        const values = [username];

        // Execute the query
        pool.query(sql, values, (error, results) => {
            if (error) {
                console.error("Error fetching cart items:", error);
                res.status(500).json({ error: "Internal server error." });
                return;
            }
            // Return the cart items as a JSON response
            res.status(200).json(results);
        });
    } catch (error) {
        console.error("Error fetching cart items:", error);
        res.status(500).json({ error: "Internal server error." });
    }
}


export const addToCart = (req, res) => {
    const { email, product_name, price, quantity, product_id } = req.body;

    // Validate incoming data
    if (!email || !product_name || !price || !quantity || !product_id) {
        return res.status(400).json({ error: 'Invalid input data' });
    }

    pool.query(
        'SELECT cartItems FROM users WHERE email = ?',
        [email],
        (error, results) => {
            if (error) {
                console.error('Error fetching cart items:', error);
                return res.status(500).json({ error: 'Internal server error.' });
            }

            let cartItems = [];
            if (results.length > 0 && results[0].cartItems) {
                cartItems = JSON.parse(results[0].cartItems);
            }

            const existingProductIndex = cartItems.findIndex(item => item.product_id === product_id);

            if (existingProductIndex !== -1) {
                cartItems[existingProductIndex].quantity += quantity;
                cartItems[existingProductIndex].price += price * quantity;
            } else {
                cartItems.push({ product_name, price, quantity, product_id });
            }

            pool.query(
                'UPDATE users SET cartItems = ? WHERE email = ?',
                [JSON.stringify(cartItems), email],
                (error) => {
                    if (error) {
                        console.error('Error updating cart items:', error);
                        return res.status(500).json({ error: 'Internal server error.' });
                    }

                    res.status(200).json({ message: 'Product added to cart successfully.' });
                }
            );
        }
    );
};