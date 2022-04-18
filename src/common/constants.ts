export const PORT = process.env.NODE_PORT;
export const DB_CONNECTION = {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
}
export const BCRYPT_SALT: number = Number.parseInt(process.env.BCRYPT_SALT);
export enum HttpCodeEnum {
    SUCCESS = 200,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    SERVER_ERROR = 500,
    SERVER_UNAVAILABLE = 503
}

export const ONE_THOUSEN = 1000;

export const SIXTY = 60;

export const ONE = 1;

export const JWT_SECRET = process.env.JWT_SECRET;

export const DB_SCHEMA_NAME = 'sw';

export const DB_TABLES = {
    users: 'user'
}