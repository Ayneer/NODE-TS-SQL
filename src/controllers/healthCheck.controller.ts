import { HttpCodeEnum } from '../common/constants';
import { RequestHandler } from 'express';
import { requestResponse } from '../managers/response.manager';

const healthCheckController: RequestHandler = async (req, res, next) => {
    try {
        res.status(HttpCodeEnum.SUCCESS)
            .json(requestResponse({ message: 'Application is running successfully' }));
    } catch (error) {
        next(error.message);
    }
}

export {
    healthCheckController
}