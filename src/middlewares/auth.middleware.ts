import { RequestHandler } from 'express';
import { signInSchema } from '../common/validators/schemas/auth.schema';

export const signInMiddleware: RequestHandler = (req, res, next) => {
    const { error } = signInSchema.validate(req.body);
    if (error?.message) {
        throw new Error(error.message);
    }
    next();
}