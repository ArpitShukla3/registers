import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserModel } from "../Schema/UserModel";
dotenv.config();

interface AuthenticatedRequest extends Request {
  user?: any;
}

const middleAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.cookies.token; // Use cookie-parser to get the token

  if (!token) {
    res.status(401).json({ message: "Access denied. No token provided." });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };
    const user = await UserModel.findById(decoded.id) as { _id: string };

    if (!user) {
      res.status(401).json({ message: "Access denied. User not found." });
      return;
    }

    req.user = { _id: user._id.toString() }; // Attach the user ID to the request object
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token.", error });
  }
};

export default middleAuth;