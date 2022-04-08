import { getMockReq, getMockRes } from '@jest-mock/express';
import { healthCheckMiddleware } from '../healthCheck.middleware';
import { jwtSchema } from '../../common/validators/schemas/jwt.schema';

const { mockClear } = getMockRes();
const mockNext = jest.fn();

describe('HealthCheck Middleware Suit Tests', () => {
    let spyJoi: jest.SpyInstance;

    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeAll(() => {
        mockClear();
        spyJoi = jest.spyOn(jwtSchema, 'validate');
    });

    test('Should call the next function when healthCheckMiddleware is called', () => {
        const { res: mockRes } = getMockRes();
        const mockReq = getMockReq({ headers: { token: 'abc' } });

        healthCheckMiddleware(mockReq, mockRes, mockNext);

        expect(spyJoi).toHaveBeenCalled();
        expect(spyJoi).toHaveBeenCalledWith({ token: 'abc' });
        expect(mockNext).toHaveBeenCalled();
    });

    test('Should not call the next function when healthCheckMiddleware is called', () => {
        const { res: mockRes } = getMockRes();
        const mockReq = getMockReq({ headers: {} });

        expect(() => healthCheckMiddleware(mockReq, mockRes, mockNext)).toThrow();
        expect(() => healthCheckMiddleware(mockReq, mockRes, mockNext)).toThrowError('required_token');
        expect(spyJoi).toHaveBeenCalled();
        expect(spyJoi).toHaveBeenCalledWith({});
        expect(mockNext).not.toHaveBeenCalled();
    });
});
