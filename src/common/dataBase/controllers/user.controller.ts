import { Users } from '../models/user.model';
import { Logger } from 'tslog';

const logger: Logger = new Logger();

export const createUser = async (user: Partial<Users>): Promise<Partial<Users>> => {
    try {
        return await Users.create(user, { raw: true });
    } catch (error) {
        logger.info(error);
        throw new Error('error_to_do_crud_on_db');
    }
}

export const getAllUsers = async (): Promise<Partial<Users>[]> => {
    try {
        return await Users.findAll({ raw: true });
    } catch (error) {
        logger.info(error);
        throw new Error('error_to_do_crud_on_db');
    }
}

export const getUserByEmail = async (email: string): Promise<Partial<Users>> => {
    try {
        return await Users.findOne({
            where: {
                email
            }
        });
    } catch (error) {
        logger.info(error);
        throw new Error('error_to_do_crud_on_db');
    }
}

export const deleteUserByEmail = async (email: string): Promise<void> => {
    try {
        await Users.destroy({
            where: {
                email
            }
        });
    } catch (error) {
        logger.info(error);
        throw new Error('error_to_do_crud_on_db');
    }
}