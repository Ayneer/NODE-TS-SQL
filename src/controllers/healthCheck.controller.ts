import { HttpCodeEnum } from '../common/constants';
import { RequestHandler } from 'express';
import { requestResponse } from '../managers/response.manager';

export const healthCheckController: RequestHandler = async (req, res, next) => {
    res.status(HttpCodeEnum.SUCCESS)
        .json(requestResponse({ message: 'Application is running successfully' }));
}