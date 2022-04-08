import {
    createUser,
    getAllUsers,
    getUserByEmail,
    deleteUserByEmail
} from '../../common/dataBase/controllers/user.controller';
import { Users } from '../../common/dataBase/models/user.model';
import {
    createUserManager,
    getAllUsersManager,
    getUserByEmailManager,
    deleteUserByEmailManager
} from '../user.manager';

jest.mock('../../common/dataBase/controllers/user.controller', () => ({
    createUser: jest.fn(),
    getAllUsers: jest.fn(),
    getUserByEmail: jest.fn(),
    deleteUserByEmail: jest.fn()
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

describe('User Manager Suit Tests', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Create User Tests', () => {
        test('should create a user when createUserManager is called', async () => {
            (createUser as jest.Mock).mockImplementation(() => Promise.resolve(mockUser));
            (getUserByEmail as jest.Mock).mockImplementation(() => Promise.resolve({}));
            const createdUser = { ...userData };

            const userRes = await createUserManager(mockUser);

            expect(userRes.name).toEqual(createdUser.name);
            expect(userRes.password).not.toBeDefined();
            expect(createUser).toHaveBeenCalled();
            expect(createUser).toHaveBeenCalledWith(mockUser);
        });

        test('should not create a user when createUserManager is called and the user already exist', async () => {
            (createUser as jest.Mock).mockImplementation(() => Promise.resolve(mockUser));
            (getUserByEmail as jest.Mock).mockImplementation(() => Promise.resolve({...mockUser, id: '1'}));

            await expect(() => createUserManager(mockUser)).rejects.toThrow();
            await expect(() => createUserManager(mockUser)).rejects.toThrowError('user_already_exist');
            expect(createUser).not.toHaveBeenCalled();
            expect(createUser).not.toHaveBeenCalledWith(mockUser);
        });

        test('should not create a user when createUserManager is called', async () => {
            (createUser as jest.Mock).mockImplementation(() => Promise.reject({ message: 'error' }));
            (getUserByEmail as jest.Mock).mockImplementation(() => Promise.resolve({}));

            await expect(() => createUserManager(mockUser)).rejects.toThrow();
            await expect(() => createUserManager(mockUser)).rejects.toThrowError('error');
            expect(createUser).toHaveBeenCalled();
            expect(createUser).toHaveBeenCalledWith(mockUser);
        });
    });

    describe('Get All Users Tests', () => {
        test('should get all users when getAllUsersManager is called', async () => {
            (getAllUsers as jest.Mock).mockImplementation(() => Promise.resolve([mockUser]));

            const users = await getAllUsersManager();

            expect(users).toEqual([mockUser]);
            expect(getAllUsers).toHaveBeenCalled();
            expect(getAllUsers).toHaveBeenCalledWith();
        });

        test('should not get all users when getAllUsersManager is called', async () => {
            (getAllUsers as jest.Mock).mockImplementation(() => Promise.reject({ message: 'error' }));

            await expect(() => getAllUsersManager()).rejects.toThrow();
            await expect(() => getAllUsersManager()).rejects.toThrowError('error');
            expect(getAllUsers).toHaveBeenCalled();
            expect(getAllUsers).toHaveBeenCalledWith();
        });
    });

    describe('Get User By Email Tests', () => {
        test('should get a user when getUserByEmailManager is called', async () => {
            (getUserByEmail as jest.Mock).mockImplementation(() => Promise.resolve(mockUser));

            const user = await getUserByEmailManager(userData.email);

            expect(user.name).toEqual(mockUser.name);
            expect(user.password).not.toBeDefined();
            expect(getUserByEmail).toHaveBeenCalled();
            expect(getUserByEmail).toHaveBeenCalledWith(userData.email);
        });

        test('should not get a user when getUserByEmailManager is called', async () => {
            (getUserByEmail as jest.Mock).mockImplementation(() => Promise.reject({ message: 'error' }));

            await expect(() => getUserByEmailManager(userData.email)).rejects.toThrow();
            await expect(() => getUserByEmailManager(userData.email)).rejects.toThrowError('error');
            expect(getUserByEmail).toHaveBeenCalled();
            expect(getUserByEmail).toHaveBeenCalledWith(userData.email);
        });

        test('should not get a user when getUserByEmailManager is called and the user does not exist', async () => {
            (getUserByEmail as jest.Mock).mockImplementation(() => Promise.resolve({}));

            await expect(() => getUserByEmailManager(userData.email)).rejects.toThrow();
            await expect(() => getUserByEmailManager(userData.email)).rejects.toThrowError('user_not_exist');
            expect(getUserByEmail).toHaveBeenCalled();
            expect(getUserByEmail).toHaveBeenCalledWith(userData.email);
        });
    });

    describe('Delete User By Email Tests', () => {
        test('should delete a user when deleteUserByEmailManager is called', async () => {
            (deleteUserByEmail as jest.Mock).mockImplementation(() => Promise.resolve());

            await deleteUserByEmailManager(userData.email);

            expect(deleteUserByEmail).toHaveBeenCalled();
            expect(deleteUserByEmail).toHaveBeenCalledWith(userData.email);
        });

        test('should not delete a user when deleteUserByEmailManager is called', async () => {
            (deleteUserByEmail as jest.Mock).mockImplementation(() => Promise.reject({ message: 'error' }));

            await expect(() => deleteUserByEmailManager(userData.email)).rejects.toThrow();
            await expect(() => deleteUserByEmailManager(userData.email)).rejects.toThrowError('error');
            expect(deleteUserByEmail).toHaveBeenCalled();
            expect(deleteUserByEmail).toHaveBeenCalledWith(userData.email);
        });
    });
});