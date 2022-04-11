import { Sequelize } from 'sequelize';
import connetToDataBase from '../index';

const mockSecrets = {
    host: 'MyHost',
    password: 'password',
    username: 'username',
    port: '123',
    database: 'dbname'
};

jest.mock('../../constants', () => ({
    DB_CONNECTION: {
        host: 'MyHost',
        password: 'password',
        username: 'username',
        port: '123',
        database: 'dbname'
    }
}));

jest.mock('../models/user.model', () => ({
    initUserModel: jest.fn()
}));

jest.mock('sequelize', () => {
    const mSequelize = {
        authenticate: jest.fn(() => Promise.resolve({})),
        define: jest.fn()
    };
    const actualSequelize = jest.requireActual('sequelize');
    return {
        Sequelize: jest.fn(() => mSequelize),
        DataTypes: actualSequelize.DataTypes
    };
});

describe('Database index Suit test', () => {

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should create a sequelize client whith the get secret when connetToDataBase is called', async () => {
        await connetToDataBase();

        expect(Sequelize).toHaveBeenCalledWith({
            ...mockSecrets,
            port: Number.parseInt(mockSecrets.port),
            dialect: 'postgres'
        });
    });
});
