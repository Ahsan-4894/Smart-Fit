import mongoose from "mongoose";
import dotenv from "dotenv";
import { GlobalErrorHandler } from "../utils/utility.js";
import { StatusCodes } from "http-status-codes";
dotenv.config();

export const connectDB = async (DATABASE_URI, DB_NAME) => {
  try {
    await mongoose.connect(DATABASE_URI, { dbName: DB_NAME });
    console.log("Connected to DB");
  } catch (error) {
    throw new GlobalErrorHandler(
      "cant connect to the database",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
