import mongoose from "mongoose";
import { ENV } from "./index.js";

export const connectDB = async () => {
      try {
        mongoose.connect(ENV.MONGO_URI);
        console.log("Mongo DB is connected successfully.");
    } catch (err) {
        console.log(`Mongo DB connection failed: ${err.message}`);
        process.exit(1);
    }
};   
    