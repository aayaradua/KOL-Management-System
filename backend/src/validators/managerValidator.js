import { body, param } from "express-validator";
import { validateRequest } from "../middlewares/validateRequest.js";

export const addManagerValidation = [
    body('name')
    .notEmpty().withMessage('Name is required')
    .isString().withMessage('Name must be a string'),

    body('regions')
    .notEmpty().withMessage('regions are required'),

    validateRequest
];

export const viewManagerInfoValidation = [
    param('id')
    .isMongoId().withMessage('Id is required'),

    validateRequest
];

export const modifyManagerValidation = [
    param('id')
    .isMongoId().withMessage('Id is required'),

    body('regions')
    .notEmpty().withMessage('regions are required'),

    validateRequest
];

export const deleteManagerValidation = [
    param('id')
    .isMongoId().withMessage('Id is required'),

    validateRequest
];