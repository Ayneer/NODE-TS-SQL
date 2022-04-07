import { createUser, getAllUsers, getUserByEmail, deleteUserByEmail } from '../common/dataBase/controllers/user.controller';
import { Users } from '../common/dataBase/models/user.model';

export const createUserManager = async (user: Partial<Users>): Promise<Partial<Users>> => {
    try {
        return (await createUser(user)).toJSON();
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