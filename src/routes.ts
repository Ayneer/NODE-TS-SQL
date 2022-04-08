import { Router } from 'express';
import {
    deleteUserByEmaiController,
    getAllUsersController,
    getUserByEmaiController
} from './controllers/user.controller';
import { healthCheckController } from './controllers/healthCheck.controller';
import { createUserMiddleware } from './middlewares/user.middleware';
import { healthCheckMiddleware } from './middlewares/healthCheck.middleware';
import { signInController, signUpController } from './controllers/auth.controller';
import { signInMiddleware, validateJwTokenMiddleware } from './middlewares/auth.middleware';

const healtCheckRoute = Router();
healtCheckRoute.get('/', healthCheckMiddleware, healthCheckController);

const userRoute = Router();
userRoute.get('/all', getAllUsersController);
userRoute.get('/', validateJwTokenMiddleware, getUserByEmaiController);
userRoute.delete('/', validateJwTokenMiddleware, deleteUserByEmaiController);

const authRoute = Router();
authRoute.post('/signin', signInMiddleware, signInController);
authRoute.post('/signup', createUserMiddleware, signUpController);

export default {
    healtCheckRoute,
    userRoute,
    authRoute
}