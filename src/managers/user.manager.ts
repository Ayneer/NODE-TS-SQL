import { createUser, getAllUsers, getUserByEmail, deleteUserByEmail } from '../common/dataBase/controllers/user.controller';
import { Users } from '../common/dataBase/models/user.model';
import { validateAlreadyUserExist } from './utils';

const PASSWORD_KEY = 'password';

export const createUserManager = async (user: Partial<Users>): Promise<Partial<Users>> => {
    try {
        await validateAlreadyUserExist(user.email, true, false);
        const newUser = (await createUser(user)).toJSON();
        delete newUser[PASSWORD_KEY];
        return newUser;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getAllUsersManager = async (): Promise<Partial<Users>[]> => {
    try {
        return (await getAllUsers()).map(user => {
            delete user[PASSWORD_KEY];
            return user;
        });
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getUserByEmailManager = async (email: string): Promise<Partial<Users>> => {
    try {
        const user = await getUserByEmail(email);
        if (!user?.email) {
            throw new Error('user_not_exist');
        }
        user.toJSON();
        delete user[PASSWORD_KEY];
        return user;
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