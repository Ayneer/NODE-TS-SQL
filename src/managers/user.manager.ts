import { createUser, getAllUsers, getUserByEmail, deleteUserByEmail } from '../common/dataBase/controllers/user.controller';
import { Users } from '../common/dataBase/models/user.model';
import { generateBcryptHash } from '../common/utils';
import { validateAlreadyUserExist } from './utils';

export const createUserManager = async (user: Partial<Users>): Promise<Partial<Users>> => {
    try {
        await validateAlreadyUserExist(user.email);
        user.password = await generateBcryptHash(user.password);
        const newUser = (await createUser(user)).toJSON();
        delete newUser['password'];
        return newUser;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getAllUsersManager = async (): Promise<Partial<Users>[]> => {
    try {
        return await getAllUsers();
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getUserByEmailManager = async (email: string): Promise<Partial<Users>> => {
    try {
        return await getUserByEmail(email);
    } catch (error) {
        throw new Error(error.message);
    }
}

export const deleteUserByEmailManager = async (email: string): Promise<void> => {
    try {
        await deleteUserByEmail(email);
    } catch (error) {
        throw new Error(error.message);
    }
}