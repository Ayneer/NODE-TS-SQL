import { HttpCodeEnum } from '../common/constants';
import { RequestHandler } from 'express';
import { requestResponse } from '../managers/response.manager';
import {
    createUserManager,
    getAllUsersManager,
    getUserByEmailManager,
    deleteUserByEmailManager
} from '../managers/user.manager';

export const createUserController: RequestHandler = async (req, res, next) => {
    try {
        const response = await createUserManager(req.body.data);
        res.status(HttpCodeEnum.SUCCESS)
            .json(requestResponse(response));
    } catch (error) {
        next(error.message);
    }
}

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
        const response = await getUserByEmailManager(req.params.email);
        res.status(HttpCodeEnum.SUCCESS)
            .json(requestResponse(response));
    } catch (error) {
        next(error.message);
    }
}

export const deleteUserByEmaiController: RequestHandler = async (req, res, next) => {
    try {
        await deleteUserByEmailManager(req.params.email);
        res.status(HttpCodeEnum.SUCCESS)
            .json(requestResponse({}));
    } catch (error) {
        next(error.message);
    }
}