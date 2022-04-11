import { getMockReq, getMockRes } from '@jest-mock/express';
import { signInMiddleware, validateJwTokenMiddleware } from '../auth.middleware';
import { signInSchema, tokenSchema } from '../../common/validators/schemas/auth.schema';
import { validateJWT } from '../../common/utils';

jest.mock('../../common/utils', () => ({
    validateJWT: jest.fn()
}));

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
    let spyJoiTokenSchema: jest.SpyInstance;

    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeAll(() => {
        mockClear();
        spyJoi = jest.spyOn(signInSchema, 'validate');
        spyJoiTokenSchema = jest.spyOn(tokenSchema, 'validate');
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

    describe('Validate JwToken Middleware Tests', () => {
        test('Should call the next function when validateJwTokenMiddleware is called', () => {
            (validateJWT as jest.Mock).mockImplementation(() => ({ data: { email: 'emailmock' } }));
            const { res: mockRes } = getMockRes();
            const mockReq = getMockReq({ headers: { authorization: 'Bearer mock-token' } });

            validateJwTokenMiddleware(mockReq, mockRes, mockNext);

            expect(spyJoiTokenSchema).toHaveBeenCalled();
            expect(spyJoiTokenSchema).toHaveBeenCalledWith(mockReq.headers);
            expect(validateJWT).toHaveBeenCalled();
            expect(validateJWT).toHaveBeenCalledWith('mock-token');
            expect(mockNext).toHaveBeenCalled();
        });

        test('Should not call the next function when validateJwTokenMiddleware is called and validation token schema throw an error', () => {
            const { res: mockRes } = getMockRes();
            const mockReq = getMockReq({ headers: {} });

            expect(() => validateJwTokenMiddleware(mockReq, mockRes, mockNext)).toThrow();
            expect(() => validateJwTokenMiddleware(mockReq, mockRes, mockNext)).toThrowError('required_unauthorized');
            expect(spyJoiTokenSchema).toHaveBeenCalled();
            expect(spyJoiTokenSchema).toHaveBeenCalledWith({});
            expect(validateJWT).not.toHaveBeenCalled();
            expect(mockNext).not.toHaveBeenCalled();
        });

        test('Should not call the next function when validateJwTokenMiddleware is called and validation token throw an error', () => {
            (validateJWT as jest.Mock).mockImplementation(() => ({}));
            const { res: mockRes } = getMockRes();
            const mockReq = getMockReq({ headers: { authorization: 'Bearer mock-token' } });

            expect(() => validateJwTokenMiddleware(mockReq, mockRes, mockNext)).toThrow();
            expect(() => validateJwTokenMiddleware(mockReq, mockRes, mockNext)).toThrowError('invalid_token');
            expect(spyJoiTokenSchema).toHaveBeenCalled();
            expect(spyJoiTokenSchema).toHaveBeenCalledWith(mockReq.headers);
            expect(validateJWT).toHaveBeenCalled();
            expect(validateJWT).toHaveBeenCalledWith('mock-token');
            expect(mockNext).not.toHaveBeenCalled();
        });
    });
});
