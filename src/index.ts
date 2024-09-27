import express from 'express';
import authRouter from './Router/authRouter';
import dotenv from 'dotenv';
import connectDb from './connection/connectMongoDb';
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
connectDb();
app.use(express.json());
app.use("/auth", authRouter);
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

