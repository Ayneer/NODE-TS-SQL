import { RequestHandler } from 'express';
import { createUserSchema, getUserByEmailSchema } from '../common/validators/schemas/user.schema';

export const createUserMiddleware: RequestHandler = (req, res, next) => {
    const { error } = createUserSchema.validate(req.body);
    if (error?.message) {
        throw new Error(error.message);
    }
    next();
}

export const getUserByEmailMiddleware: RequestHandler = (req, res, next) => {
    const { error } = getUserByEmailSchema.validate({ params: req.params });
    if (error?.message) {
        throw new Error(error.message);
    }
    next();
}