import { connect } from "http2";
import dotenv from "dotenv";
dotenv.config();
import { MongoClient, ServerApiVersion } from "mongodb";
import mongoose from "mongoose";
import logger from "../../logger";
async function run()
{
    try {
       const uri = process.env.uri;
       if (!uri) {
           logger.error("MongoDB connection URI is not defined in environment variables");
           throw new Error("MongoDB connection URI is not defined in environment variables");
       }
       await mongoose.connect(uri);
        logger.info("mongodb connected");

    } catch (error) {
        logger.info("mongodb failed to connect due to:",error)
    }
}

const connectDb=run;
export default connectDb;
