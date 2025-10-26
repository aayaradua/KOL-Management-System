import express from "express";
import {
  forgotPassword,
  loginUser,
  logoutUser,
  resetPassword,
  createUser,
  onboarding,
} from "../controllers/authController.js";
import {
  loginValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
  addUserValidation,
} from "../validators/authValidator.js";
import { verifyToken } from "../middlewares/userAuth.js";

const router = express.Router();

router
  .post("/login", loginValidation, loginUser)
  .post("/create-user", verifyToken, addUserValidation, createUser)
  .post("/onboarding", onboarding)
  .post("/forget", forgotPasswordValidation, forgotPassword)
  .post("/reset/:token", resetPasswordValidation, resetPassword)
  .post("/logout", logoutUser);

export default router;
