import mongoose from "mongoose";
import { ENV } from "./index.js";

export const connectDB = async () => {
      try {
        mongoose.connect(ENV.MONGO_URI);
    } catch (err) {
        process.exit(1);
    }
};   
    