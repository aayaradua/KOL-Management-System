import { body, param } from "express-validator";
import { validateRequest } from "../middlewares/validateRequest.js";

export const loginValidation = [
    body('email')
    .isEmail()
    .normalizeEmail().withMessage('Email is required'),
    
    body("password")
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),

    validateRequest
];

export const forgotPasswordValidation = [
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format'),

    validateRequest
];

export const resetPasswordValidation = [
  body('newPassword')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),

 param('token')
    .exists().withMessage('Id is required'),

    validateRequest
];

export const addUserValidation = [
  body("username").notEmpty().withMessage("Username is required"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),

  body("role")
    .trim()
    .toLowerCase()
    .isIn(["admin", "marketing-manager", "director", "kol"])
    .withMessage("Invalid role specified"),

  body("status")
    .optional()
    .trim()
    .toLowerCase()
    .isIn(["enable", "disable"])
    .withMessage("Status must be enable or disable"),

  validateRequest,
];