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

const userRoute = Router();
userRoute.post('/', createUserMiddleware, createUserController);
userRoute.get('/', getAllUsersController);
userRoute.get('/:email', getUserByEmailMiddleware, getUserByEmaiController);
userRoute.delete('/:email', getUserByEmailMiddleware, deleteUserByEmaiController);

export default {
    healtCheckRoute,
    userRoute
}