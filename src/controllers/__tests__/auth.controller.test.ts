import { getMockReq, getMockRes } from '@jest-mock/express';
import { signInByEmailAndPasswordManager, signUpUserManager } from '../../managers/auth.manager';
import { signInController, signUpController } from '../auth.controller';
import { HttpCodeEnum } from '../../common/constants';

jest.mock('../../managers/auth.manager', () => ({
    signInByEmailAndPasswordManager: jest.fn(),
    signUpUserManager: jest.fn()
}));

const { mockClear } = getMockRes();
const mockNext = jest.fn();
const userMock = {
    data: {
        email: 'mockEmail@mock.com',
        password: 'mockpassword'
    }
};

describe('Auth Controller Suit Tests', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeAll(() => {
        mockClear();
    });

    describe('Sign In Controller Tests', () => {
        test('Should response successfull when signInController is called', async () => {
            (signInByEmailAndPasswordManager as jest.Mock).mockImplementation(() => Promise.resolve({ message: 'success' }));
            const { res: mockRes } = getMockRes();
            const mockReq = getMockReq({ body: userMock });

            await signInController(mockReq, mockRes, mockNext);

            expect(signInByEmailAndPasswordManager).toHaveBeenCalled();
            expect(signInByEmailAndPasswordManager).toHaveBeenCalledWith(userMock.data.email, userMock.data.password);
            expect(mockRes.status).toHaveBeenCalled();
            expect(mockRes.status).toHaveBeenCalledWith(HttpCodeEnum.SUCCESS);
            expect(mockRes.json).toHaveBeenCalled();
            expect(mockRes.json).toHaveBeenCalledWith({ data: { message: 'success' } });
            expect(mockNext).not.toHaveBeenCalled();
        });

        test('Should call the next function when signInController is called', async () => {
            (signInByEmailAndPasswordManager as jest.Mock).mockImplementation(() => Promise.reject({ message: 'error' }));
            const { res: mockRes } = getMockRes();
            const mockReq = getMockReq({ body: userMock });
            
            await signInController(mockReq, mockRes, mockNext);

            expect(signInByEmailAndPasswordManager).toHaveBeenCalled();
            expect(signInByEmailAndPasswordManager).toHaveBeenCalledWith(userMock.data.email, userMock.data.password);
            expect(mockRes.status).not.toHaveBeenCalled();
            expect(mockRes.json).not.toHaveBeenCalled();
            expect(mockNext).toHaveBeenCalled();
            expect(mockNext).toHaveBeenCalledWith('error');
        });
    });

    describe('Sign Un Controller Tests', () => {
        test('Should response successfull when signUpController is called', async () => {
            (signUpUserManager as jest.Mock).mockImplementation(() => Promise.resolve({ message: 'success' }));
            const { res: mockRes } = getMockRes();
            const mockReq = getMockReq({ body: userMock });

            await signUpController(mockReq, mockRes, mockNext);

            expect(signUpUserManager).toHaveBeenCalled();
            expect(signUpUserManager).toHaveBeenCalledWith(userMock.data);
            expect(mockRes.status).toHaveBeenCalled();
            expect(mockRes.status).toHaveBeenCalledWith(HttpCodeEnum.SUCCESS);
            expect(mockRes.json).toHaveBeenCalled();
            expect(mockRes.json).toHaveBeenCalledWith({ data: { message: 'success' } });
            expect(mockNext).not.toHaveBeenCalled();
        });

        test('Should call the next function when signUpController is called', async () => {
            (signUpUserManager as jest.Mock).mockImplementation(() => Promise.reject({ message: 'error' }));
            const { res: mockRes } = getMockRes();
            const mockReq = getMockReq({ body: userMock });

            await signUpController(mockReq, mockRes, mockNext);

            expect(signUpUserManager).toHaveBeenCalled();
            expect(signUpUserManager).toHaveBeenCalledWith(userMock.data);
            expect(mockRes.status).not.toHaveBeenCalled();
            expect(mockRes.json).not.toHaveBeenCalled();
            expect(mockNext).toHaveBeenCalled();
            expect(mockNext).toHaveBeenCalledWith('error');
        });
    });
});
