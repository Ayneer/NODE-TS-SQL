import { Router } from 'express';
import {
    createUserController,
    deleteUserByEmaiController,
    getAllUsersController,
    getUserByEmaiController
} from './controllers/user.controller';
import { healthCheckController } from './controllers/healthCheck.controller';
import { createUserMiddleware, getUserByEmailMiddleware } from './middlewares/user.middleware';
import { healthCheckMiddleware } from './middlewares/healthCheck.middleware';

const healtCheckRoute = Router();
healtCheckRoute.get('/', healthCheckMiddleware, healthCheckController);

const createUserRoute = Router();
createUserRoute.post('/', createUserMiddleware, createUserController);
createUserRoute.get('/', getAllUsersController);
createUserRoute.get('/:email', getUserByEmailMiddleware, getUserByEmaiController);
createUserRoute.delete('/:email', getUserByEmailMiddleware, deleteUserByEmaiController);

export default {
    healtCheckRoute,
    createUserRoute
}