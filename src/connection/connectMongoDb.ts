import { connect } from "http2";
import dotenv from "dotenv";
dotenv.config();
import { MongoClient, ServerApiVersion } from "mongodb";
import mongoose from "mongoose";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });
// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   }
//   catch (e) {
//     console.error(e);
//   }
// }
async function run()
{
    try {
       const uri = process.env.uri;
       if (!uri) {
           throw new Error("MongoDB connection URI is not defined in environment variables");
       }
       await mongoose.connect(uri);
        console.log("mongodb connected");

    } catch (error) {
        console.log("mongodb failed to connect due to:",error)
    }
}
// export default ConnectMongo;

const connectDb=run;
export default connectDb;
