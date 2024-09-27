import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserModel } from "../Schema/UserModel";

dotenv.config();
interface AuthenticatedRequest extends Request {
  user?: typeof UserModel.prototype; // Adjust type according to your schema
}
const middleAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ message: "Access denied. No token provided." });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };
    const user = await UserModel.findById(decoded.id);

    if (!user) {
      res.status(401).json({ message: "Access denied. User not found." });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token.", error });
  }
};

export default middleAuth;
