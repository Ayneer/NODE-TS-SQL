import { SignInModel } from '../common/models/auth.model';
import { getUserByEmailManager, createUserManager } from './user.manager';
import { compareBcryptHash, generateBcryptHash, generateJWT } from '../common/utils';
import { Users } from '../common/dataBase/models/user.model';

export const signInByEmailAndPasswordManager = async (email: string, password: string): Promise<SignInModel> => {
    try {
        const { name, password: hash } = await getUserByEmailManager(email);
        if (!(await compareBcryptHash(password, hash))) {
            throw new Error('invalid_email_password');
        }
        return {
            user: {
                name
            },
            token: generateJWT({ email })
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

export const signUpUserManager = async (user: Partial<Users>): Promise<SignInModel> => {
    try {
        user.password = await generateBcryptHash(user.password);
        const createdUser = await createUserManager(user);
        return {
            user: createdUser,
            token: generateJWT({ email: user.email })
        }
    } catch (error) {
        throw new Error(error.message);
    }
}