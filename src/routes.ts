import express from 'express';
import bodyParser from 'body-parser';
import {
    deleteUserByEmaiController,
    getAllUsersController,
    getUserByEmailController
} from './controllers/user.controller';
import { healthCheckController } from './controllers/healthCheck.controller';
import { createUserMiddleware } from './middlewares/user.middleware';
import { healthCheckMiddleware } from './middlewares/healthCheck.middleware';
import { signInController, signUpController } from './controllers/auth.controller';
import { signInMiddleware, validateJwTokenMiddleware } from './middlewares/auth.middleware';
import { errorHandler } from './middlewares/errorHandler.middleware';

const app = express();

//Statics Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '5mb' }));

const healtCheckRoute = express.Router();
healtCheckRoute.get('/', healthCheckMiddleware, healthCheckController);

const userRoute = express.Router();
userRoute.get('/all', getAllUsersController);
userRoute.get('/', validateJwTokenMiddleware, getUserByEmailController);
userRoute.delete('/', validateJwTokenMiddleware, deleteUserByEmaiController);

const authRoute = express.Router();
authRoute.post('/signin', signInMiddleware, signInController);
authRoute.post('/signup', createUserMiddleware, signUpController);

//Routes
app.use('/api/v1/healthcheck', healtCheckRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/auth', authRoute);

//Error Handler Middleware
app.use(errorHandler);

export default app;