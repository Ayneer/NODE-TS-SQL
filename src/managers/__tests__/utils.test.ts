import { getUserByEmail } from '../../common/dataBase/controllers/user.controller';
import { validateAlreadyUserExist } from '../utils';

jest.mock('../../common/dataBase/controllers/user.controller', () => ({
    getUserByEmail: jest.fn()
}));


describe('Utils Manager Suit Tests', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Validate Already User Exist test', () => {
        test('should throw a error when validateAlreadyUserExist is called and exist the user', async () => {
            (getUserByEmail as jest.Mock).mockImplementation(() => Promise.resolve({ id: '1' }));
            const mockEmail = 'mockEmail';

            await expect(() => validateAlreadyUserExist(mockEmail, true, false)).rejects.toThrow();
            await expect(() => validateAlreadyUserExist(mockEmail, true, false)).rejects.toThrowError('user_already_exist');
            expect(getUserByEmail).toHaveBeenCalled();
            expect(getUserByEmail).toHaveBeenCalledWith(mockEmail);
        });

        test('should throw a error when validateAlreadyUserExist is called and does not exist the user', async () => {
            (getUserByEmail as jest.Mock).mockImplementation(() => Promise.resolve({}));
            const mockEmail = 'mockEmail';

            await expect(() => validateAlreadyUserExist(mockEmail, false, true)).rejects.toThrow();
            await expect(() => validateAlreadyUserExist(mockEmail, false, true)).rejects.toThrowError('user_not_exist');
            expect(getUserByEmail).toHaveBeenCalled();
            expect(getUserByEmail).toHaveBeenCalledWith(mockEmail);
        });

        test('should not throw a error when validateAlreadyUserExist is called', async () => {
            (getUserByEmail as jest.Mock).mockImplementation(() => Promise.resolve({}));
            const mockEmail = 'mockEmail';

            validateAlreadyUserExist(mockEmail, true, false);

            expect(getUserByEmail).toHaveBeenCalled();
            expect(getUserByEmail).toHaveBeenCalledWith(mockEmail);
        });
    });
});