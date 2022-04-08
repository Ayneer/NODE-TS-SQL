import { Router } from 'express';
import {
    deleteUserByEmaiController,
    getAllUsersController,
    getUserByEmaiController
} from './controllers/user.controller';
import { healthCheckController } from './controllers/healthCheck.controller';
import { createUserMiddleware, getUserByEmailMiddleware } from './middlewares/user.middleware';
import { healthCheckMiddleware } from './middlewares/healthCheck.middleware';
import { signInController, signUpController } from './controllers/auth.controller';
import { signInMiddleware } from './middlewares/auth.middleware';

const healtCheckRoute = Router();
healtCheckRoute.get('/', healthCheckMiddleware, healthCheckController);

const userRoute = Router();
userRoute.get('/', getAllUsersController);
userRoute.get('/:email', getUserByEmailMiddleware, getUserByEmaiController);
userRoute.delete('/:email', getUserByEmailMiddleware, deleteUserByEmaiController);

const authRoute = Router();
authRoute.post('/signin', signInMiddleware, signInController);
authRoute.post('/signup', createUserMiddleware, signUpController);

export default {
    healtCheckRoute,
    userRoute,
    authRoute
}