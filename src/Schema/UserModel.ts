import { Schema, model, Document } from 'mongoose';
import { z } from 'zod';

// Define the Zod schema for validation
const userSchemaZod = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
});

// Define the TypeScript interface for the user document
interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

// Define the Mongoose schema
const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// Create the Mongoose model
const UserModel = model<IUser>('User', userSchema);

// Function to validate user data using Zod
const validateUser = (user: unknown) => {
    return userSchemaZod.safeParse(user);
};

export { UserModel, validateUser, IUser };