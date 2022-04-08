import { RequestHandler } from 'express';
import { signInSchema, tokenSchema } from '../common/validators/schemas/auth.schema';
import { validateJWT } from '../common/utils';
import { ONE } from '../common/constants';

export const signInMiddleware: RequestHandler = (req, res, next) => {
    const { error } = signInSchema.validate(req.body);
    if (error?.message) {
        throw new Error(error.message);
    }
    next();
}

export const validateJwTokenMiddleware: RequestHandler = (req, res, next) => {
    const { error } = tokenSchema.validate(req.headers);
    if (error?.message) {
        throw new Error(error.message);
    }
    const token = req.headers.authorization.split('Bearer ')[ONE];
    const { data } = validateJWT(token);
    if (!data?.email) {
        throw new Error('invalid_token');
    }
    req.body = { ...req.body, email: data.email };
    next();
} 