import express from "express";
import { getUserCartItems, deleteCartItems, getCartItemsByUsername, addToCart } from "../controller/cart-controller.js";

const cartRouter = express.Router()

cartRouter
    .get("/user/cartItems", getUserCartItems)
    .delete('/api/cart/:id', deleteCartItems)
    .get('/api/getUserCartItems', getCartItemsByUsername)
    .post('/user/addToCart', addToCart)


export default cartRouter;