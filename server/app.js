import express from "express";
const app = express();

import dotenv from "dotenv";
dotenv.config({
  path: "../.env",
});

import { errorMiddleware } from "./middlewares/error.middleware.js";
import cors from "cors";
import { connectDB } from "./configuration/dbConnect.js";
import { v2 as cloudinary } from "cloudinary";
import cookieParser from "cookie-parser";

// All Routes.
import USER_ROUTE from "./routes/user.route.js";
import AUTH_ROUTE from "./routes/auth.route.js";
import ADMIN_ROUTE from "./routes/admin.route.js";
import PLAN_ROUTE from "./routes/plan.route.js";

// All ENV Variables
const SERVER_URL = process.env.SERVER_URL;
const PORT = process.env.PORT;
const CLIENT_URL = process.env.CLIENT_URL;
const DATABASE_URI = process.env.DATABASE_URI;
const DB_NAME = process.env.DB_NAME;
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

// DB Connection
connectDB(DATABASE_URI, DB_NAME);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Cloudinary Configuration
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

// All Routes.
app.use("/api/v1/users", USER_ROUTE);
app.use("/api/v1/auth", AUTH_ROUTE);
app.use("/api/v1/admin", ADMIN_ROUTE);
app.use("/api/v1/plan", PLAN_ROUTE);

app.get("/", (req, res) => {
  res.send("Hello from JavaScript!");
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`${SERVER_URL}`);
});
