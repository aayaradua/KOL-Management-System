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