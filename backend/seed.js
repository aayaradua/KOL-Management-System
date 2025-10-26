import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "./src/models/User.js"; // adjust this path to your actual model location
import bcrypt from "bcrypt";

dotenv.config(); // Load environment variables

const seedUser = async () => {
  try {
    // connect to DB
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ Connected to MongoDB");

    // Clear existing admin with same email (optional)
    await User.deleteOne({ email: "ahmad.admin@example.com" });

    // hash password
    const hashedPassword = await bcrypt.hash("Saniy!23", 10);

    // insert user
    const newUser = await User.create({
      username: "saniy",
      role: "admin",
      email: "saniy@example.com",
      password: hashedPassword,
      status: "enable",
    });

    console.log("✅ User seeded:", newUser);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding user:", error.message);
    process.exit(1);
  }
};

seedUser();
