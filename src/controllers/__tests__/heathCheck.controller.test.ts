import { getMockReq, getMockRes } from '@jest-mock/express';
import { HttpCodeEnum } from '../../common/constants';
import { healthCheckController } from '../healthCheck.controller';

const { mockClear } = getMockRes();
const mockNext = jest.fn();
const userMock = {
    data: {
        email: 'mockEmail@mock.com',
        password: 'mockpassword'
    }
};

describe('Health Check Suit Tests', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeAll(() => {
        mockClear();
    });

    describe('Health Check Controller Tests', () => {
        test('Should response successfull when healthCheckController is called', async () => {
            const { res: mockRes } = getMockRes();
            const mockReq = getMockReq({});

            healthCheckController(mockReq, mockRes, mockNext);

            expect(mockRes.status).toHaveBeenCalled();
            expect(mockRes.status).toHaveBeenCalledWith(HttpCodeEnum.SUCCESS);
            expect(mockRes.json).toHaveBeenCalled();
            expect(mockRes.json).toHaveBeenCalledWith({ data: { message: 'Application is running successfully' } });
        });
    });
});
