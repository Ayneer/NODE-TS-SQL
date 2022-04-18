import 'dotenv/config';
import { Logger } from 'tslog';
import connetToDataBase from './src/common/dataBase';
import app from './src/routes';

const logger: Logger = new Logger();
const port = process.env.PORT;

app.listen(port, async () => {
    await connetToDataBase();
    logger.info(`App is running on port ${port}`);
});