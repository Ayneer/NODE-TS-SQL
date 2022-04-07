import { ErrorRequestHandler } from 'express';
import { getErrorByKey } from '../managers/error.manager';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    const error = getErrorByKey(err?.message ?? err);
    res.status(error.error.status).send(error);
}