import express from "express";
import dotenv from "dotenv";

// Set this according to yourself
import { errorMiddleware } from "./middlewares/error.js";
dotenv.config({
  path: "../.env",
});
import cors from "cors";
import { connectDB } from "./configuration/dbConnect.js";
import { v2 as cloudinary } from "cloudinary";

const app = express();

// All ENV Variables
const SERVER_URL = process.env.SERVER_URL;
const CLIENT_URL = process.env.CLIENT_URL;
const DATABASE_URI = process.env.DATABASE_URI;
const DB_NAME = process.env.DB_NAME;
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

connectDB(DATABASE_URI, DB_NAME);

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

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
