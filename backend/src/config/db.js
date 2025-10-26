import mongoose from "mongoose";
import dotenv from "dotenv";
import { ENV } from "./index.js";

dotenv.config();

export const connectDB = async () => {
  try {
    mongoose.connect(
      ENV.MONGO_URI ||
        "mongodb+srv://aayaradua:ululalbab2018@cluster-1.dharfjb.mongodb.net/KOL?retryWrites=true&w=majority&appName=Cluster-1"
    );
  } catch (err) {
    process.exit(1);
  }
};
