import { Request, Response } from 'express';
import { UserModel, validateUser } from '../../Schema/UserModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { log } from 'console';
dotenv.config();

const register = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password } = req.body;

    try {
        // Validate user data with Zod schema
        const validateUserResult = validateUser({ name, email, password });
        if (!validateUserResult.success) {
            res.status(400).json({ message: validateUserResult.error });
            return;
        }

        // Check if the user already exists
        // log("Checking if user exists");
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user object with the hashed password
        const newUser = new UserModel({
            ...validateUserResult.data, // Pass the validated fields from Zod
            password: hashedPassword, // Replace the plain-text password with the hashed password
        });

        // Save the user to the database
        await newUser.save();
        // console.log("Saving user with data:", newUser);

        // Generate a JWT token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET!, {
            expiresIn: '1h'
        });
        // Set the JWT token as a cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: 'strict', // Helps prevent CSRF attacks
            maxAge: 3600000 // 1 hour in milliseconds
        });
        // Respond with the new user and token
        res.status(201).json({ user: newUser, token });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export default register;
