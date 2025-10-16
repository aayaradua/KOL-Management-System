import express, { Router } from "express";
import { forgotPassword, loginUser, logoutUser, resetPassword } from "../controllers/authController.js";
import { loginValidation, forgotPasswordValidation, resetPasswordValidation } from "../validators/authValidator.js";
import { checkIfBlocked } from "../middlewares/checkIfBlocked.js";

const router = express.Router();

router.post('/login', loginValidation, loginUser);
router.post('/forget', forgotPasswordValidation, forgotPassword);
router.post('/reset/:token', resetPasswordValidation, resetPassword);
router.post('/logout', logoutUser);

export default router;
