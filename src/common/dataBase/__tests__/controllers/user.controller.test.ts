import { Users } from '../../models/user.model';
import {
    createUser,
    getAllUsers,
    getUserByEmail,
    deleteUserByEmail
} from '../../controllers/user.controller';

jest.mock('../../models/user.model', () => ({
    Users: {
        create: jest.fn(),
        destroy: jest.fn(),
        findOne: jest.fn(),
        findAll: jest.fn()
    }
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

describe('User Database Controller Suit Tests', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Create User Tests', () => {
        test('should create a user when createUser is called', async () => {
            const createMock = jest.fn(() => Promise.resolve({ ...mockUser, id: '1' }));
            (Users.create as jest.Mock).mockImplementation(createMock);

            const userRes = await createUser(mockUser);

            const calls: any[] = createMock.mock.calls[0];
            expect(calls[0]).toEqual(mockUser);
            expect(userRes.id).toBe('1');
        });

        test('should not create a user when createUser is called', async () => {
            const createMock = jest.fn(() => Promise.reject('error'));
            (Users.create as jest.Mock).mockImplementation(createMock);

            await expect(createUser(mockUser)).rejects.toThrowError();
            await expect(createUser(mockUser)).rejects.toThrow('error_to_do_crud_on_db');
        });
    });

    describe('Get All Users Tests', () => {
        test('should get all users when getAllUsers is called', async () => {
            const findAllMock = jest.fn(() => Promise.resolve([{ ...mockUser, id: '1' }]));
            (Users.findAll as jest.Mock).mockImplementation(findAllMock);

            const userRes = await getAllUsers();

            expect(userRes).toEqual([{ ...mockUser, id: '1' }]);
        });

        test('should not get all users when getAllUsers is called', async () => {
            const findAllMock = jest.fn(() => Promise.reject('error'));
            (Users.findAll as jest.Mock).mockImplementation(findAllMock);

            await expect(getAllUsers()).rejects.toThrowError();
            await expect(getAllUsers()).rejects.toThrow('error_to_do_crud_on_db');
        });
    });

    describe('Get User By Email Tests', () => {
        test('should get a user when getUserByEmail is called', async () => {
            const findOneMock = jest.fn(() => Promise.resolve({ ...mockUser, id: '1' }));
            (Users.findOne as jest.Mock).mockImplementation(findOneMock);

            const userRes = await getUserByEmail('emailMock');

            const calls: any[] = findOneMock.mock.calls[0];
            expect(calls[0].where).toEqual({ email: 'emailMock' });
            expect(userRes.id).toBe('1');
        });

        test('should not get a user when getUserByEmail is called', async () => {
            const findOneMock = jest.fn(() => Promise.reject('error'));
            (Users.findOne as jest.Mock).mockImplementation(findOneMock);

            await expect(getUserByEmail('emailMock')).rejects.toThrowError();
            await expect(getUserByEmail('emailMock')).rejects.toThrow('error_to_do_crud_on_db');
        });
    });

    describe('Delete User By Email Tests', () => {
        test('should delete a user when deleteUserByEmail is called', async () => {
            const destroyMock = jest.fn(() => Promise.resolve({}));
            (Users.destroy as jest.Mock).mockImplementation(destroyMock);

            await deleteUserByEmail('emailMock');

            const calls: any[] = destroyMock.mock.calls[0];
            expect(calls[0].where).toEqual({ email: 'emailMock' });
        });

        test('should not delete a user when deleteUserByEmail is called', async () => {
            const destroyMock = jest.fn(() => Promise.reject('error'));
            (Users.destroy as jest.Mock).mockImplementation(destroyMock);

            await expect(deleteUserByEmail('emailMock')).rejects.toThrowError();
            await expect(deleteUserByEmail('emailMock')).rejects.toThrow('error_to_do_crud_on_db');
        });
    });
});