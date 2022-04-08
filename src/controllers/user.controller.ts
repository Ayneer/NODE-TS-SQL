import { HttpCodeEnum } from '../common/constants';
import { RequestHandler } from 'express';
import { requestResponse } from '../managers/response.manager';
import {
    getAllUsersManager,
    getUserByEmailManager,
    deleteUserByEmailManager
} from '../managers/user.manager';

export const getAllUsersController: RequestHandler = async (req, res, next) => {
    try {
        const response = await getAllUsersManager();
        res.status(HttpCodeEnum.SUCCESS)
            .json(requestResponse(response));
    } catch (error) {
        next(error.message);
    }
}

export const getUserByEmaiController: RequestHandler = async (req, res, next) => {
    try {
        const { email } = req.body;
        const response = await getUserByEmailManager(email);
        res.status(HttpCodeEnum.SUCCESS)
            .json(requestResponse(response));
    } catch (error) {
        next(error.message);
    }
}

export const deleteUserByEmaiController: RequestHandler = async (req, res, next) => {
    try {
        const { email } = req.body;
        await deleteUserByEmailManager(email);
        res.status(HttpCodeEnum.SUCCESS)
            .json(requestResponse({}));
    } catch (error) {
        next(error.message);
    }
}