import { HttpCodeEnum } from '../common/constants';
import { Request, Response, NextFunction } from 'express';
import { requestResponse } from '../managers/response.manager';
import {
    getAllUsersManager,
    getUserByEmailManager,
    deleteUserByEmailManager
} from '../managers/user.manager';

export const getAllUsersController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await getAllUsersManager();
        res.status(HttpCodeEnum.SUCCESS)
            .json(requestResponse(response));
    } catch (error) {
        next(error.message);
    }
}

export const getUserByEmailController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.body;
        const response = await getUserByEmailManager(email);
        res.status(HttpCodeEnum.SUCCESS)
            .json(requestResponse(response));
    } catch (error) {
        next(error.message);
    }
}

export const deleteUserByEmaiController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.body;
        await deleteUserByEmailManager(email);
        res.status(HttpCodeEnum.SUCCESS)
            .json(requestResponse({}));
    } catch (error) {
        next(error.message);
    }
}