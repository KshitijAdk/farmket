import express from 'express';
import { passwordChange, userLogin, userSignup } from '../controller/loginController.js';

const loginRouter = express.Router();

loginRouter
    .post('/login', userLogin)
    .post('/signup', userSignup)
    .post('/change-password', passwordChange)

export default loginRouter;