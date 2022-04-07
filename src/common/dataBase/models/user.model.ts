import { DataTypes, Model, Sequelize } from 'sequelize';
import { DB_SCHEMA_NAME, DB_TABLES } from '../../constants';

const { STRING, INTEGER } = DataTypes;

class Users extends Model {
    id: number;
    name: string;
    email: string;
}

const userEntity = {
    id: {
        type: INTEGER,
        autoIncrement: true
    },
    name: {
        type: STRING,
        allowNull: false
    },
    email: {
        type: STRING,
        primaryKey: true,
        allowNull: false
    }
};

const initUserModel = (sequelize: Sequelize) => {
    Users.init(userEntity, {
        modelName: DB_TABLES.users,
        tableName: DB_TABLES.users,
        schema: DB_SCHEMA_NAME,
        sequelize,
        timestamps: false
    });
};


export {
    Users,
    initUserModel
};
