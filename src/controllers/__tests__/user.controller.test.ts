import { getMockReq, getMockRes } from '@jest-mock/express';
import { HttpCodeEnum } from '../../common/constants';
import { getAllUsersManager, getUserByEmailManager, deleteUserByEmailManager } from '../../managers/user.manager';
import { getAllUsersController, getUserByEmailController, deleteUserByEmaiController } from '../user.controller';

jest.mock('../../managers/user.manager', () => ({
    getAllUsersManager: jest.fn(),
    getUserByEmailManager: jest.fn(),
    deleteUserByEmailManager: jest.fn()
}));

const { mockClear } = getMockRes();
const mockNext = jest.fn();
const userMock = {
    data: {
        email: 'mockEmail@mock.com',
        password: 'mockpassword'
    }
};

describe('User Controller Suit Tests', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeAll(() => {
        mockClear();
    });

    describe('Get All Users Controller Tests', () => {
        test('Should response successfull when getAllUsersController is called', async () => {
            (getAllUsersManager as jest.Mock).mockImplementation(() => Promise.resolve({ message: 'success' }));
            const { res: mockRes } = getMockRes();
            const mockReq = getMockReq();

            await getAllUsersController(mockReq, mockRes, mockNext);

            expect(getAllUsersManager).toHaveBeenCalled();
            expect(mockRes.status).toHaveBeenCalled();
            expect(mockRes.status).toHaveBeenCalledWith(HttpCodeEnum.SUCCESS);
            expect(mockRes.json).toHaveBeenCalled();
            expect(mockRes.json).toHaveBeenCalledWith({ data: { message: 'success' } });
            expect(mockNext).not.toHaveBeenCalled();
        });

        test('Should call the next function when getAllUsersController is called', async () => {
            (getAllUsersManager as jest.Mock).mockImplementation(() => Promise.reject({ message: 'error' }));
            const { res: mockRes } = getMockRes();
            const mockReq = getMockReq({ body: userMock });

            await getAllUsersController(mockReq, mockRes, mockNext);

            expect(getAllUsersManager).toHaveBeenCalled();
            expect(mockRes.status).not.toHaveBeenCalled();
            expect(mockRes.json).not.toHaveBeenCalled();
            expect(mockNext).toHaveBeenCalled();
            expect(mockNext).toHaveBeenCalledWith('error');
        });
    });

    describe('Get User By Email Controller Tests', () => {
        test('Should response successfull when getUserByEmailController is called', async () => {
            (getUserByEmailManager as jest.Mock).mockImplementation(() => Promise.resolve({ message: 'success' }));
            const { res: mockRes } = getMockRes();
            const mockReq = getMockReq({ body: { email: userMock.data.email } });

            await getUserByEmailController(mockReq, mockRes, mockNext);

            expect(getUserByEmailManager).toHaveBeenCalled();
            expect(getUserByEmailManager).toHaveBeenCalledWith(userMock.data.email);
            expect(mockRes.status).toHaveBeenCalled();
            expect(mockRes.status).toHaveBeenCalledWith(HttpCodeEnum.SUCCESS);
            expect(mockRes.json).toHaveBeenCalled();
            expect(mockRes.json).toHaveBeenCalledWith({ data: { message: 'success' } });
            expect(mockNext).not.toHaveBeenCalled();
        });

        test('Should call the next function when getUserByEmailController is called', async () => {
            (getUserByEmailManager as jest.Mock).mockImplementation(() => Promise.reject({ message: 'error' }));
            const { res: mockRes } = getMockRes();
            const mockReq = getMockReq({ body: { email: userMock.data.email } });

            await getUserByEmailController(mockReq, mockRes, mockNext);

            expect(getUserByEmailManager).toHaveBeenCalled();
            expect(getUserByEmailManager).toHaveBeenCalledWith(userMock.data.email);
            expect(mockRes.status).not.toHaveBeenCalled();
            expect(mockRes.json).not.toHaveBeenCalled();
            expect(mockNext).toHaveBeenCalled();
            expect(mockNext).toHaveBeenCalledWith('error');
        });
    });

    describe('Delete User By Email Controller Tests', () => {
        test('Should response successfull when deleteUserByEmaiController is called', async () => {
            (deleteUserByEmailManager as jest.Mock).mockImplementation(() => Promise.resolve({ message: 'success' }));
            const { res: mockRes } = getMockRes();
            const mockReq = getMockReq({ body: { email: userMock.data.email } });

            await deleteUserByEmaiController(mockReq, mockRes, mockNext);

            expect(deleteUserByEmailManager).toHaveBeenCalled();
            expect(deleteUserByEmailManager).toHaveBeenCalledWith(userMock.data.email);
            expect(mockRes.status).toHaveBeenCalled();
            expect(mockRes.status).toHaveBeenCalledWith(HttpCodeEnum.SUCCESS);
            expect(mockRes.json).toHaveBeenCalled();
            expect(mockRes.json).toHaveBeenCalledWith({ data: {} });
            expect(mockNext).not.toHaveBeenCalled();
        });

        test('Should call the next function when deleteUserByEmaiController is called', async () => {
            (deleteUserByEmailManager as jest.Mock).mockImplementation(() => Promise.reject({ message: 'error' }));
            const { res: mockRes } = getMockRes();
            const mockReq = getMockReq({ body: { email: userMock.data.email } });

            await deleteUserByEmaiController(mockReq, mockRes, mockNext);

            expect(deleteUserByEmailManager).toHaveBeenCalled();
            expect(deleteUserByEmailManager).toHaveBeenCalledWith(userMock.data.email);
            expect(mockRes.status).not.toHaveBeenCalled();
            expect(mockRes.json).not.toHaveBeenCalled();
            expect(mockNext).toHaveBeenCalled();
            expect(mockNext).toHaveBeenCalledWith('error');
        });
    });

});
