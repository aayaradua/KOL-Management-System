import mongoose from "mongoose";
import { Kol } from "./Kol.js";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "director", "marketing-manager", "kol"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["enable", "disable"],
      required: true,
    },
    otherInfo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "kol"
    },
    resetPasswordToken: String,
    resetPasswordTokenExpires: Date,
  },
  { timestamps: true }
);

export const User = mongoose.model("user", userSchema);