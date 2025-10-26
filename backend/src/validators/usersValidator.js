import { body, param } from "express-validator";
import { validateRequest } from "../middlewares/validateRequest.js";


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

export const modifyKolPostValidation = [
  param('id')
    .isMongoId().withMessage('Invalid KOL ID'),

  body('xAccount').optional().isString().withMessage('X account must be a string'),
  body('xFollowers').optional().isNumeric().withMessage('X followers must be a number'),

  body('youtubeAccount').optional().isString().withMessage('YouTube account must be a string'),
  body('youtubeFollowers').optional().isNumeric().withMessage('YouTube followers must be a number'),

  body('tiktokAccount').optional().isString().withMessage('TikTok account must be a string'),
  body('tiktokFollowers').optional().isNumeric().withMessage('TikTok followers must be a number'),

  body('telegramAccount').optional().isString().withMessage('Telegram account must be a string'),
  body('telegramFollowers').optional().isNumeric().withMessage('Telegram followers must be a number'),

  validateRequest
];

export const userValidation = [
  param("id").isMongoId().withMessage("Id is required"),
  validateRequest,
];