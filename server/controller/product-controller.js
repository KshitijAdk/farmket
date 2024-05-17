import pool from "./db.js";

export const getApples = (req, res) => {
    pool.query('SELECT farmer_name, product_name, product_desc, price, location, product_id FROM product_view WHERE product_name = ?', ['Apple'], (error, results) => {
        if (error) {
            console.error('Error fetching apple data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
}
export const getStrawberry = (req, res) => {
    pool.query('SELECT farmer_name, product_name, product_desc, price, location, product_id FROM product_view WHERE product_name = ?', ['strawberry'], (error, results) => {
        if (error) {
            console.error('Error fetching apple data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
}
export const getMango = (req, res) => {
    pool.query('SELECT farmer_name, product_name, product_desc, price, location, product_id FROM product_view WHERE product_name = ?', ['mango'], (error, results) => {
        if (error) {
            console.error('Error fetching apple data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
}
export const getCabbage = (req, res) => {
    pool.query('SELECT farmer_name, product_name, product_desc, price, location, product_id FROM product_view WHERE product_name = ?', ['cabbage'], (error, results) => {
        if (error) {
            console.error('Error fetching apple data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
}
export const getCarrot = (req, res) => {
    pool.query('SELECT farmer_name, product_name, product_desc, price, location, product_id FROM product_view WHERE product_name = ?', ['carrot'], (error, results) => {
        if (error) {
            console.error('Error fetching apple data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
}
export const getTomato = (req, res) => {
    pool.query('SELECT farmer_name, product_name, product_desc, price, location, product_id FROM product_view WHERE product_name = ?', ['tomato'], (error, results) => {
        if (error) {
            console.error('Error fetching apple data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
}
export const getChicken = (req, res) => {
    pool.query('SELECT farmer_name, product_name, product_desc, price, location, product_id FROM product_view WHERE product_name = ?', ['chicken'], (error, results) => {
        if (error) {
            console.error('Error fetching apple data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
}
export const getMutton = (req, res) => {
    pool.query('SELECT farmer_name, product_name, product_desc, price, location, product_id FROM product_view WHERE product_name = ?', ['mutton'], (error, results) => {
        if (error) {
            console.error('Error fetching apple data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
}
export const getFish = (req, res) => {
    pool.query('SELECT farmer_name, product_name, product_desc, price, location, product_id FROM product_view WHERE product_name = ?', ['fish'], (error, results) => {
        if (error) {
            console.error('Error fetching apple data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
}
export const getMilk = (req, res) => {
    pool.query('SELECT farmer_name, product_name, product_desc, price, location, product_id FROM product_view WHERE product_name = ?', ['milk'], (error, results) => {
        if (error) {
            console.error('Error fetching apple data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
}
export const getGhee = (req, res) => {
    pool.query('SELECT farmer_name, product_name, product_desc, price, location, product_id FROM product_view WHERE product_name = ?', ['ghee'], (error, results) => {
        if (error) {
            console.error('Error fetching apple data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
}
export const getButter = (req, res) => {
    pool.query('SELECT farmer_name, product_name, product_desc, price, location, product_id FROM product_view WHERE product_name = ?', ['butter'], (error, results) => {
        if (error) {
            console.error('Error fetching apple data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
}