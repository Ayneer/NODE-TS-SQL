import { getUserByEmail } from '../common/dataBase/controllers/user.controller';

export const validateAlreadyUserExist = async (email: string, throwErrorExist: boolean, throwErrorNotExist: boolean): Promise<void> => {
    const user = await getUserByEmail(email);
    if (user?.id && throwErrorExist) {
        throw new Error('user_already_exist');
    } else if (!user?.id && throwErrorNotExist) {
        throw new Error('user_not_exist');
    }
}