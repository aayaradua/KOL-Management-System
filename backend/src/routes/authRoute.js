import express, { Router } from "express";
import {
  forgotPassword,
  loginUser,
  logoutUser,
  resetPassword,
  createUser,
} from "../controllers/authController.js";
import {
  loginValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
  addUserValidation,
} from "../validators/authValidator.js";
import { checkIfBlocked } from "../middlewares/checkIfBlocked.js";
import { verifyToken } from "../middlewares/userAuth.js";
import checkRole from "../middlewares/checkRole.js";

const router = express.Router();

router.post("/login",
  loginValidation, 
  loginUser
);

router.post(
  "/create-user",
  verifyToken,
  
  addUserValidation,
  createUser
);

router.post(
  "/forget", 
  forgotPasswordValidation, 
  forgotPassword
);

router.post(
  "/reset/:token", 
  resetPasswordValidation, 
  resetPassword
);

router.post(
  "/logout", 
  logoutUser
);
export default router;