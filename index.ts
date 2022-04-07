import routes from './src/routes';
import express from 'express';
import bodyParser from 'body-parser';
import { Logger } from 'tslog';
import connetToDataBase from './src/common/dataBase';
import { errorHandler } from './src/middlewares/errorHandler.middleware';

const logger: Logger = new Logger();

const app = express();
const port = process.env.PORT || 8080;

//Statics Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '5mb' }));

//Routes
app.use('/healthcheck', routes.healtCheckRoute);
app.use('/users', routes.userRoute);

//Error Handler Middleware
app.use(errorHandler);

app.listen(port, async () => {
    await connetToDataBase();
    logger.info(`App is running on port ${port}`);
});