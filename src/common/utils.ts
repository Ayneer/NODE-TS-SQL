import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { BCRYPT_SALT, JWT_SECRET, ONE_THOUSEN, SIXTY } from './constants';
import { Logger } from 'tslog';

const logger: Logger = new Logger();

export const generateBcryptHash = async (text: string): Promise<string> => {
    try {
        const salt = await bcrypt.genSalt(BCRYPT_SALT);
        return await bcrypt.hash(text, salt);
    } catch (error) {
        logger.info(error);
        throw new Error('generate_bcrypt_hash_error');
    }
}

export const compareBcryptHash = async (text: string, hash: string): Promise<boolean> => {
    try {
        return await bcrypt.compare(text, hash);
    } catch (error) {
        logger.info(error);
        throw new Error('generate_bcrypt_hash_error');
    }
}

export const generateJWT = (data: object | string): string => {
    try {
        return jwt.sign({
            exp: Math.floor(Date.now() / ONE_THOUSEN) + (SIXTY * SIXTY),
            data
        }, JWT_SECRET);
    } catch (error) {
        throw new Error('token_generation_error');
    }

}

export const validateJWT = (token: string): any  => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        throw new Error('invalid_token');
    }
}