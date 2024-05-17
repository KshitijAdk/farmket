import express from 'express';
import { getOrderHistory, deleteOrderProducts, updateTotalPrice } from '../controller/order_controller.js';

const orderRouter = express.Router()



orderRouter
    .get('/cart-items', getOrderHistory)
    .delete("/delete-product", deleteOrderProducts)
    .post('/update-total-price', updateTotalPrice)

export default orderRouter;

