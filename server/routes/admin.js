import express from 'express';
import { getAllProducts, deleteProduct, addProduct, getAllUsers, deleteAllCartItems, getCartItems, rowCount } from "../controller/controller.js";

const router = express.Router(); // Create a router instance

// Define routes on the router
router
    .get('/products', getAllProducts)
    .delete('/products/:productId', deleteProduct)
    .post('/products', addProduct)
    .get('/users', getAllUsers)
    .delete('/cart', deleteAllCartItems)
    .get('/cartItems', getCartItems)
    .get('/row-counts', rowCount);


export default router;

