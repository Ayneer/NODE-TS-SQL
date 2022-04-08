import { getMockReq, getMockRes } from '@jest-mock/express';
import { createUserMiddleware, getUserByEmailMiddleware } from '../user.middleware';
import { createUserSchema, getUserByEmailSchema } from '../../common/validators/schemas/user.schema';

const { mockClear } = getMockRes();
const mockNext = jest.fn();
const userMock = {
    data: {
        name: 'mockName',
        email: 'mockEmail@mock.com',
        password: 'mockpassword'
    }
};

describe('User Middleware Suit Tests', () => {
    let spyJoi: jest.SpyInstance;
    let spyJoi2: jest.SpyInstance;

    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeAll(() => {
        mockClear();
        spyJoi = jest.spyOn(createUserSchema, 'validate');
        spyJoi2 = jest.spyOn(getUserByEmailSchema, 'validate');
    });

    describe('Create User Middleware Tests', () => {
        test('Should call the next function when createUserMiddleware is called', () => {
            const { res: mockRes } = getMockRes();
            const mockReq = getMockReq({ body: userMock });

            createUserMiddleware(mockReq, mockRes, mockNext);

            expect(spyJoi).toHaveBeenCalled();
            expect(spyJoi).toHaveBeenCalledWith(userMock);
            expect(mockNext).toHaveBeenCalled();
        });

        test('Should not call the next function when createUserMiddleware is called', () => {
            const { res: mockRes } = getMockRes();
            const mockReq = getMockReq({ body: {} });

            expect(() => createUserMiddleware(mockReq, mockRes, mockNext)).toThrow();
            expect(() => createUserMiddleware(mockReq, mockRes, mockNext)).toThrowError('required_user_object');
            expect(spyJoi).toHaveBeenCalled();
            expect(spyJoi).toHaveBeenCalledWith({});
            expect(mockNext).not.toHaveBeenCalled();
        });
    });

    describe('Get User By Email Middleware Tests', () => {
        test('Should call the next function when getUserByEmailMiddleware is called', () => {
            const { res: mockRes } = getMockRes();
            const mockEmail = userMock.data.email;
            const params = { params: { email: mockEmail } };
            const mockReq = getMockReq(params);

            getUserByEmailMiddleware(mockReq, mockRes, mockNext);

            expect(spyJoi2).toHaveBeenCalled();
            expect(spyJoi2).toHaveBeenCalledWith(params);
            expect(mockNext).toHaveBeenCalled();
        });

        test('Should not call the next function when getUserByEmailMiddleware is called', () => {
            const { res: mockRes } = getMockRes();
            const mockReq = getMockReq({ params: {} });

            expect(() => getUserByEmailMiddleware(mockReq, mockRes, mockNext)).toThrow();
            expect(() => getUserByEmailMiddleware(mockReq, mockRes, mockNext)).toThrowError('required_user_email');
            expect(spyJoi2).toHaveBeenCalled();
            expect(spyJoi2).toHaveBeenCalledWith({ params: {} });
            expect(mockNext).not.toHaveBeenCalled();
        });

    });
});
