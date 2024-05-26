import { Request, Response, NextFunction } from 'express';
import { validationResult, body } from 'express-validator';

// Utils
import { AppError } from '../util/appError';

export const createUserValidation = [
    body('firstName')
        .exists()
        .withMessage('First name is required')
        .isLength({ min: 3 })
        .withMessage('First name must be at least 3 characters long'),
    body('lastName')
        .exists()
        .withMessage('Last name is required')
        .isLength({ min: 3 })
        .withMessage('Last name must be at least 3 characters long'),
    body('email')
        .exists()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email'),  
    body('password')
        .exists()
        .withMessage('Password is required')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        //.isStrongPassword,
];


export const createNoteValidation = [
    body('title')
        .exists()
        .withMessage('Title is required')
        .isLength({ min: 3 })
        .withMessage('Title must be at least 3 characters long'),
    body('body')
        .exists()
        .withMessage('Body is required')
        .isLength({ min: 3 })
        .withMessage('Body must be at least 3 characters long'),
    body('date')
        .exists()
        .withMessage('Date is required')
        .isISO8601()
        .withMessage('Invalid date format'),
];


export const  checkValidations = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((err) => err.msg);
        const message = errorMessages.join('. ');
        return next(new AppError(message, 400));
    }
    next();
};