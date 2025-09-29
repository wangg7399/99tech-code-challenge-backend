import { body, param, validationResult } from 'express-validator'
import * as express from 'express'
import { Request, Response } from 'express'

// A reusable middleware to handle validation errors
const handleValidationErrors = (req: Request, res: Response, next: express.NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
};

// Validation chain for creating a user
const createUserValidation = [
    body('name').isString().withMessage('Name must be a string.').notEmpty().withMessage('Name is required.'),
    body('age').isInt({ min: 0 }).withMessage('Age must be a non-negative integer.').optional()
];

// Validation chain for updating a user (all fields are optional)
const updateUserValidation = [
    body('name').isString().withMessage('Name must be a string.').optional(),
    body('age').isInt({ min: 0 }).withMessage('Age must be a non-negative integer.').optional()
];

// Validation chain for MongoDB ObjectId in params
const mongoIdValidation = [
    param('id').isMongoId().withMessage('Invalid user ID format.')
];

export {handleValidationErrors, createUserValidation, updateUserValidation, mongoIdValidation}