import express from "express";
import authRouter from "./Router/authRouter";
import dotenv from "dotenv";
import connectDb from "./connection/connectMongoDb";
import mediaRouter from "./Router/media";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
connectDb();
app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRouter);
app.use("/media", mediaRouter);
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
