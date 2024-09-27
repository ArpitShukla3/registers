import { Request, Response } from 'express';
import logger from '../../../logger';
const logout = (req: Request, res: Response): void => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: 'strict', // Helps prevent CSRF attacks
        });
        
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        logger.error('Server error', error);
        res.status(500).json({ message: 'Server error', error });
    }
};

export default logout;