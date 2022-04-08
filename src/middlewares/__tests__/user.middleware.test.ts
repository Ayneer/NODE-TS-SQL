import { getMockReq, getMockRes } from '@jest-mock/express';
import { createUserMiddleware } from '../user.middleware';
import { createUserSchema } from '../../common/validators/schemas/user.schema';

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

    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeAll(() => {
        mockClear();
        spyJoi = jest.spyOn(createUserSchema, 'validate');
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
});
