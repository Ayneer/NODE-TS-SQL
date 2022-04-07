import { Sequelize } from 'sequelize';
import { Logger } from 'tslog';
import { DB_CONNECTION } from '../constants';
import { initUserModel } from './models/user.model';

const logger: Logger = new Logger();

const connetToDataBase = async (): Promise<Sequelize> => {
    try {
        const { username, password, host, port, database } = DB_CONNECTION;
        const sequelize = new Sequelize({
            username,
            password,
            host,
            port: Number.parseInt(port),
            dialect: 'postgres',
            database,
        });
        initModels(sequelize);
        await sequelize.authenticate();
        return sequelize;
    } catch (error) {
        logger.info(error);
        throw new Error('internal_DB_Connection_Failed');
    }
};

const initModels = (sequelize: Sequelize) => {
    initUserModel(sequelize);
};

export default connetToDataBase;