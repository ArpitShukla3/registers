import express from "express";
import authRouter from "./Router/authRouter";
import dotenv from "dotenv";
import connectDb from "./connection/connectMongoDb";
import mediaRouter from "./Router/media";
import cookieParser from "cookie-parser";
import cors from "cors"; // Import cors
import logger from "../logger";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
connectDb();

// Configure CORS
const corsOptions = {
  origin: "*", // Allow all origins. You can specify specific origins here.
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions)); // Use cors middleware
app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRouter);
app.use("/media", mediaRouter);
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});