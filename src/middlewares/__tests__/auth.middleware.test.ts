import { getMockReq, getMockRes } from '@jest-mock/express';
import { signInMiddleware } from '../auth.middleware';
import { signInSchema } from '../../common/validators/schemas/auth.schema';

const { mockClear } = getMockRes();
const mockNext = jest.fn();
const userMock = {
    data: {
        email: 'mockEmail@mock.com',
        password: 'mockpassword'
    }
};

describe('Auth Middleware Suit Tests', () => {
    let spyJoi: jest.SpyInstance;

    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeAll(() => {
        mockClear();
        spyJoi = jest.spyOn(signInSchema, 'validate');
    });

    describe('Sign In Middleware Tests', () => {
        test('Should call the next function when signInMiddleware is called', () => {
            const { res: mockRes } = getMockRes();
            const mockReq = getMockReq({ body: userMock });

            signInMiddleware(mockReq, mockRes, mockNext);

            expect(spyJoi).toHaveBeenCalled();
            expect(spyJoi).toHaveBeenCalledWith(userMock);
            expect(mockNext).toHaveBeenCalled();
        });

        test('Should not call the next function when signInMiddleware is called', () => {
            const { res: mockRes } = getMockRes();
            const mockReq = getMockReq({ body: {} });

            expect(() => signInMiddleware(mockReq, mockRes, mockNext)).toThrow();
            expect(() => signInMiddleware(mockReq, mockRes, mockNext)).toThrowError('required_user_object');
            expect(spyJoi).toHaveBeenCalled();
            expect(spyJoi).toHaveBeenCalledWith({});
            expect(mockNext).not.toHaveBeenCalled();
        });
    });
});
