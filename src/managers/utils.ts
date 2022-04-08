import { getUserByEmail } from '../common/dataBase/controllers/user.controller';

export const validateAlreadyUserExist = async (email: string): Promise<void> => {
    const user = await getUserByEmail(email);
    if (user?.id) {
        throw new Error('user_already_exist');
    }
}