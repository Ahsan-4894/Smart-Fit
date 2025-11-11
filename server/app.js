import express from "express";
import dotenv from "dotenv";

// Set this according to yourself
import { errorMiddleware } from "./middlewares/error.js";
dotenv.config({
  path: "../.env",
});
import cors from "cors";
import { connectDB } from "./configuration/dbConnect.js";

const app = express();

const SERVER_URL = process.env.SERVER_URL;
const CLIENT_URL = process.env.CLIENT_URL;
const DATABASE_URI = process.env.DATABASE_URI;
const DB_NAME = process.env.DB_NAME;

connectDB(DATABASE_URI, DB_NAME);

app.use(
  cors({
    origin: CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from JavaScript!");
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`${SERVER_URL}`);
});
