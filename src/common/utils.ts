import bcrypt from 'bcrypt';
import { BCRYPT_SALT } from './constants';
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