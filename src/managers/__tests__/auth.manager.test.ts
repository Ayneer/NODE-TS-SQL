import { Users } from '../../common/dataBase/models/user.model';
import { compareBcryptHash, generateBcryptHash, generateJWT } from '../../common/utils';
import { signInByEmailAndPasswordManager, signUpUserManager } from '../auth.manager';
import { getUserByEmailManager, createUserManager } from '../user.manager';

jest.mock('../user.manager', () => ({
    getUserByEmailManager: jest.fn(),
    createUserManager: jest.fn()
}));

jest.mock('../../common/utils', () => ({
    compareBcryptHash: jest.fn(),
    generateBcryptHash: jest.fn(),
    generateJWT: jest.fn()
}));

const userData = {
    name: 'mockUserName',
    email: 'mockUserEmail',
    password: 'mockPassword'
}
const mockUser: Partial<Users> = {
    ...userData,
    toJSON: jest.fn(() => userData)
};

describe('Auth Manager Suit Tests', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Sign In By Email And Password Tests', () => {
        test('should sign in a user when signInByEmailAndPasswordManager is called', async () => {
            const { email, password, name } = mockUser;
            (getUserByEmailManager as jest.Mock).mockImplementation(() => Promise.resolve(mockUser));
            (compareBcryptHash as jest.Mock).mockImplementation(() => Promise.resolve(true));
            (generateJWT as jest.Mock).mockImplementation(() => 'abc');

            const userSignId = await signInByEmailAndPasswordManager(email, password);

            expect(userSignId.user).toEqual({ name });
            expect(userSignId.token).toBe('abc');
            expect(getUserByEmailManager).toHaveBeenCalled();
            expect(getUserByEmailManager).toHaveBeenCalledWith(email);
            expect(compareBcryptHash).toHaveBeenCalled();
            expect(compareBcryptHash).toHaveBeenCalledWith(password, password);
        });

        test('should not sign in a user when signInByEmailAndPasswordManager is called and the user not exist', async () => {
            const { email, password } = mockUser;
            (getUserByEmailManager as jest.Mock).mockImplementation(() => Promise.reject({ message: 'error' }));
            (compareBcryptHash as jest.Mock).mockImplementation(() => Promise.resolve(true));

            await expect(() => signInByEmailAndPasswordManager(email, password)).rejects.toThrow();
            await expect(() => signInByEmailAndPasswordManager(email, password)).rejects.toThrowError('error');
            expect(getUserByEmailManager).toHaveBeenCalled();
            expect(getUserByEmailManager).toHaveBeenCalledWith(email);
            expect(compareBcryptHash).not.toHaveBeenCalled();
        });

        test('should not sign in a user when signInByEmailAndPasswordManager is called and the password is incorrect', async () => {
            const { email, password } = mockUser;
            (getUserByEmailManager as jest.Mock).mockImplementation(() => Promise.resolve(mockUser));
            (compareBcryptHash as jest.Mock).mockImplementation(() => Promise.resolve(false));

            await expect(() => signInByEmailAndPasswordManager(email, password)).rejects.toThrow();
            await expect(() => signInByEmailAndPasswordManager(email, password)).rejects.toThrowError('invalid_email_password');
            expect(getUserByEmailManager).toHaveBeenCalled();
            expect(getUserByEmailManager).toHaveBeenCalledWith(email);
            expect(compareBcryptHash).toHaveBeenCalled();
            expect(compareBcryptHash).toHaveBeenCalledWith(password, password);
        });
    });

    describe('Sign Up User Tests', () => {
        test('should sign up a user when signUpUserManager is called', async () => {
            const { password } = mockUser;
            (createUserManager as jest.Mock).mockImplementation(() => Promise.resolve(mockUser));
            (generateBcryptHash as jest.Mock).mockImplementation(() => Promise.resolve('12345ABC'));
            (generateJWT as jest.Mock).mockImplementation(() => 'abc');

            const userSignUd = await signUpUserManager(mockUser);

            expect(userSignUd.user).toEqual({ ...mockUser, password: '12345ABC' });
            expect(userSignUd.token).toBe('abc');
            expect(createUserManager).toHaveBeenCalled();
            expect(createUserManager).toHaveBeenCalledWith({ ...mockUser, password: '12345ABC' });
            expect(generateBcryptHash).toHaveBeenCalled();
            expect(generateBcryptHash).toHaveBeenCalledWith(password);
        });

        test('should not sign un a user when signUpUserManager is called by generateBcryptHash error', async () => {
            const { password } = mockUser;
            (createUserManager as jest.Mock).mockImplementation(() => Promise.resolve(mockUser));
            (generateBcryptHash as jest.Mock).mockImplementation(() => Promise.reject({ message: 'error' }));

            await expect(() => signUpUserManager(mockUser)).rejects.toThrow();
            await expect(() => signUpUserManager(mockUser)).rejects.toThrowError('error');
            expect(createUserManager).not.toHaveBeenCalled();
            expect(generateBcryptHash).toHaveBeenCalled();
            expect(generateBcryptHash).toHaveBeenCalledWith(password);
        });

        test('should not sign un a user when signUpUserManager is called by createUserManager error', async () => {
            const { password } = mockUser;
            (createUserManager as jest.Mock).mockImplementation(() => Promise.reject({ message: 'error' }));
            (generateBcryptHash as jest.Mock).mockImplementation(() => Promise.resolve('12345ABC'));

            await expect(() => signUpUserManager(mockUser)).rejects.toThrow();
            await expect(() => signUpUserManager(mockUser)).rejects.toThrowError('error');
            expect(createUserManager).toHaveBeenCalled();
            expect(createUserManager).toHaveBeenCalledWith({ ...mockUser, password: '12345ABC' });
            expect(generateBcryptHash).toHaveBeenCalled();
            expect(generateBcryptHash).toHaveBeenCalledWith(password);
        });
    });

});