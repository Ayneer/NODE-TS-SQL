export const PORT = process.env.NODE_PORT;
export const DB_CONNECTION = {
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || '5432',
    database: process.env.DB_NAME || 'test-sw'
}
export const BCRYPT_SALT: number = Number.parseInt(process.env.BCRYPT_SALT) || 10;
export enum HttpCodeEnum {
    SUCCESS = 200,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    SERVER_ERROR = 500,
    SERVER_UNAVAILABLE = 503
}

export const DB_SCHEMA_NAME = 'sw';

export const DB_TABLES = {
    users: 'user'
}