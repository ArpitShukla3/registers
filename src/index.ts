import express from "express";
import dotenv from "dotenv";
import connectDb from "./connection/connectMongoDb";
import cookieParser from "cookie-parser";
import cors from "cors"; // Import cors
import logger from "../logger";
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import http from 'http';
import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';
import authRouter from "./Router/authRouter";
import mediaRouter from "./Router/media";

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

async function startApolloServer() {
  const httpServer = http.createServer(app);

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => ({ req, res }), // Ensure context includes req and res
    })
  );

  httpServer.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
    logger.info(`GraphQL server is running at http://localhost:${port}/graphql`);
  });
}

startApolloServer();