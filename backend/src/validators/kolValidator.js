import { body, param } from 'express-validator';
import { validateRequest } from '../middlewares/validateRequest.js'

export const addKolValidator = [
  body('country')
    .notEmpty().withMessage('Country is required')
    .isString().withMessage('Country must be a string'),

  body('name')
    .notEmpty().withMessage('Name is required')
    .isString().withMessage('Name must be a string'),

  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format'),

  body('postPrice')
    .notEmpty().withMessage('Post price is required')
    .isNumeric().withMessage('Post price must be a number'),

  body('inviter')
    .optional()
    .isString().withMessage('Inviter must be a string'),

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

export const modifyKolPostValidator = [
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

export const modifyKolDataValidator = [
  param('id')
    .isMongoId().withMessage('Invalid KOL ID'),

  body('postPrice')
    .optional()
    .isNumeric().withMessage('Post price must be a number'),

  body('inviter')
    .optional()
    .isString().withMessage('Inviter must be a string'),

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

export const addPostValidator = [
  body('postUrl')
  .notEmpty().withMessage('Post URL is required')
  .isString().withMessage('Post URL must be a string'),

  body('views').optional().isNumeric().withMessage('Views must be a number'),
  body('likes').optional().isNumeric().withMessage('Likes must be a number'),
  body('shares').optional().isNumeric().withMessage('Shares must be a number'),
  body('comments').optional().isString().withMessage('Comments must be a string'),

  body('remarks').optional().isString().withMessage('Remarks must be a string'),

  validateRequest
];

export const kolIdValidator = [
  param('id')
    .isMongoId().withMessage('Invalid KOL ID'),

    validateRequest
];
