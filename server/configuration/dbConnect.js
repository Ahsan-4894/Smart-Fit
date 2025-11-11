import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async (DATABASE_URI, DB_NAME) => {
  try {
    await mongoose.connect(DATABASE_URI, { dbName: DB_NAME });
    console.log("connected to MONGODB!");
  } catch (error) {
    console.log(error);
  }
};
