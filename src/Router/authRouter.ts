import express, { Request, Response } from 'express';
import register from '../controllers/authController/register';
import login from '../controllers/authController/login';
import logout from '../controllers/authController/logout';

const authRouter = express.Router();

// Example route for user login
authRouter.post('/login', login);

// Example route for user registration
authRouter.post('/register', register);

// Example route for user logout
authRouter.post('/logout', logout);

export default authRouter;