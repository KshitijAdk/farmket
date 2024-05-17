import pool from "./db.js"


export const getAllProducts = (req, res) => {
    // Query to fetch product details from the database
    const query = 'SELECT product_name, farmer_name, product_desc AS product_detail, stock, price, location, product_id FROM product_view';

    // Execute the query
    pool.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching product details:', error);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json(results);
        }
    });
}

export const deleteProduct = (req, res) => {
    const productId = req.params.productId;
    // Query to delete the product from the database
    const query = 'DELETE FROM product_view WHERE product_id = ?';

    // Execute the query
    pool.query(query, productId, (error, results) => {
        if (error) {
            console.error('Error deleting product:', error);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            if (results.affectedRows > 0) { // Check if any row was affected
                console.log('Product deleted successfully');
                res.status(200).json({ message: 'Product deleted successfully' });
            } else {
                console.log('Product not found');
                res.status(404).json({ error: 'Product not found' });
            }
        }
    });
}

export const addProduct = (req, res) => {
    // Extract product details from the request body
    const { product_name, farmer_name, product_detail, stock, price, location } = req.body;

    // Validate the required fields
    if (!product_name || !farmer_name || !product_detail || !stock || !price || !location) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Query to insert the new product into the database
    const query = 'INSERT INTO product_view (product_name, farmer_name, product_desc, stock, price, location) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [product_name, farmer_name, product_detail, stock, price, location];

    // Execute the query
    pool.query(query, values, (error, results) => {
        if (error) {
            console.error('Error adding product:', error);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            console.log('Product added successfully');
            // Return the newly added product data
            const newProduct = {
                product_id: results.insertId,
                product_name,
                farmer_name,
                product_detail,
                stock,
                price,
                location
            };
            res.status(201).json(newProduct);
        }
    });
}

export const getAllUsers = (req, res) => {
    // Query to fetch user data from the database
    const query = 'SELECT id, username, email, password, phone_num AS phone FROM users';

    // Execute the query
    pool.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json(results);
        }
    });
}

export const deleteAllCartItems = (req, res) => {
    try {
        // Create SQL query to delete all products from the cart
        const sql = `DELETE FROM cart`;

        // Execute the query
        pool.query(sql, (error, results) => {
            if (error) {
                console.error('Error deleting all products from cart:', error);
                res.status(500).json({ error: 'Internal server error.' });
                return;
            }
            console.log('All products deleted from cart successfully');
            res.status(200).json({ message: 'All products deleted from cart successfully.' });
        });
    } catch (error) {
        console.error('Error deleting all products from cart:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}


export const getCartItems = (req, res) => {
    try {
        // Create SQL query to fetch all cart items
        const sql = 'SELECT * FROM cart_items';

        // Execute the query
        pool.query(sql, (error, results) => {
            if (error) {
                console.error('Error fetching cart items:', error);
                res.status(500).json({ error: 'Internal server error.' });
                return;
            }
            // Send the fetched cart items as a response
            res.status(200).json(results);
        });
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};



export const rowCount = (req, res) => {
    const queryCartItems = 'SELECT COUNT(*) AS cartItemCount FROM cart_items';
    const queryProductView = 'SELECT COUNT(*) AS productViewCount FROM product_view';
    const queryUsers = 'SELECT COUNT(*) AS usersCount FROM users';

    pool.query(queryCartItems, (error1, results1) => {
        if (error1) {
            console.error('Error executing MySQL query for cart items: ' + error1.message);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        pool.query(queryProductView, (error2, results2) => {
            if (error2) {
                console.error('Error executing MySQL query for product view: ' + error2.message);
                res.status(500).json({ message: 'Internal server error' });
                return;
            }

            pool.query(queryUsers, (error3, results3) => {
                if (error3) {
                    console.error('Error executing MySQL query for users: ' + error3.message);
                    res.status(500).json({ message: 'Internal server error' });
                    return;
                }

                // Extract count values from the results
                const cartItemCount = results1[0].cartItemCount;
                const productViewCount = results2[0].productViewCount;
                const usersCount = results3[0].usersCount;

                res.status(200).json({ cartItemCount, productViewCount, usersCount });
            });
        });
    });
}