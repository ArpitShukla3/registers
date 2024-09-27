import { Request, Response } from 'express';
import { UserModel } from '../../Schema/UserModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { log } from 'console';

dotenv.config();

const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    
    try {
        // Check if the user exists
        const user = await UserModel.findOne({ email });
        log(user);
        if (!user) {
            res.status(400).json({ message: 'Invalid email or password' });
            return;
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(400).json({ message: 'Invalid email or password' });
            return;
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
            expiresIn: '1h'
        });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: 'strict', // Helps prevent CSRF attacks
            maxAge: 3600000 // 1 hour in milliseconds
        });
        // Respond with the user and token
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export default login;