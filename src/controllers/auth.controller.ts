import { Request, Response, NextFunction } from 'express';
import { HttpCodeEnum } from '../common/constants';
import { requestResponse } from '../managers/response.manager';
import { signInByEmailAndPasswordManager, signUpUserManager } from '../managers/auth.manager';

export const signInController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body.data;
        const response = await signInByEmailAndPasswordManager(email, password);
        res.status(HttpCodeEnum.SUCCESS)
            .json(requestResponse(response));
    } catch (error) {
        next(error.message);
    }
}

export const signUpController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await signUpUserManager(req.body.data);
        res.status(HttpCodeEnum.SUCCESS)
            .json(requestResponse(response));
    } catch (error) {
        next(error.message);
    }
}