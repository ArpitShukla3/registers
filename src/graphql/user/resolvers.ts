import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { AuthenticationError } from "apollo-server-express";
import { log } from "console";
import logger from "../../../logger";
import { UserModel } from "../../Schema/UserModel";
const resolvers = {
    Query: {
        users: async () => {
            return await UserModel.find();
        },
        user: async (_: any, { id }: { id: string }) => {
            return await UserModel.findById(id);
        },
    },
    Mutation: {
        createUser: async (_: any, { name, email, password }: { name: string, email: string, password: string }) => {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new UserModel({ name, email, password: hashedPassword });
            await user.save();
            return user;
        },
        login: async (_: any, { email, password }: { email: string, password: string }, { req, res }: { req: Request, res: Response }) => {
            const user = await UserModel.findOne({ email });
            if (!user) {
                logger.error("Invalid credentials");
                throw new AuthenticationError("Invalid credentials");
            }
            const valid = await bcrypt.compare(password, user.password);
            if (!valid) {
                logger.warn("Invalid credentials");
                throw new AuthenticationError("Invalid credentials");
            }
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: "1h" });
            res.cookie("token", token, { httpOnly: true });
            logger.info("Logged in");
            return user;
        },
        logout: async (_: any, __: any, { req, res }: { req: Request, res: Response }) => {
            logger.warn("Logging out");
            res.clearCookie("token");
            return true;
        },
    },
};
const userResolvers = resolvers;
export default userResolvers;