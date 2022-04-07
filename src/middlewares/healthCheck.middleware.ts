import { RequestHandler } from 'express';
import { jwtSchema } from '../common/validators/schemas/jwt.schema';

export const healthCheckMiddleware: RequestHandler = (req, res, next) => {
    const headers = req.headers;
    const { error } = jwtSchema.validate(headers);
    if(error?.message){
        throw new Error(error.message);
    }
    next();
}