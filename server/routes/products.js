import express from 'express';
import { getApples, getButter, getCabbage, getCarrot, getChicken, getFish, getGhee, getMango, getMilk, getMutton, getStrawberry, getTomato } from '../controller/product-controller.js'

const productRouter = express.Router();

productRouter
    .get('/apples', getApples)
    .get('/strawberry', getStrawberry)
    .get('/mango', getMango)
    .get('/cabbage', getCabbage)
    .get('/carrot', getCarrot)
    .get('/tomato', getTomato)
    .get('/chicken', getChicken)
    .get('/fish', getFish)
    .get('/mutton', getMutton)
    .get('/milk', getMilk)
    .get('/ghee', getGhee)
    .get('/butter', getButter);

export default productRouter;