import { body, param } from "express-validator";
import { validateRequest } from "../middlewares/validateRequest.js";

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
    .isIn(["admin", "manager", "director", "kol"])
    .withMessage("Invalid role specified"),

  body("status")
    .optional()
    .trim()
    .toLowerCase()
    .isIn(["enable", "disable"])
    .withMessage("Status must be enable or disable"),

  validateRequest,
];

export const viewUserInfoValidation = [
  param("id").isMongoId().withMessage("Id is required"),
  validateRequest,
];

export const modifyUserValidation = [
  param("id").isMongoId().withMessage("Id is required"),

  body("role")
    .optional()
    .trim()
    .toLowerCase()
    .isIn(["admin", "manager", "director", "kol"])
    .withMessage("Invalid role specified"),

  body("status")
    .optional()
    .trim()
    .toLowerCase()
    .isIn(["enable", "disable"])
    .withMessage("Status must be enable or disable"),

  validateRequest,
];

export const deleteUserValidation = [
  param("id").isMongoId().withMessage("Id is required"),
  validateRequest,
];
