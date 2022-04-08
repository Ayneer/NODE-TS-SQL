import { errorHandler } from '../errorHandler.middleware';
import { getMockReq, getMockRes } from '@jest-mock/express';
import { getErrorByKey } from '../../managers/error.manager';

jest.mock('../../managers/error.manager', () => ({
  getErrorByKey: jest.fn(),
}));

const mockReq = getMockReq();
const { mockClear } = getMockRes();
const mockNext = jest.fn();

describe('Error Handler Suit Tests', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    mockClear();
  });

  test('Should get the error message when errorHandler is called', () => {
    (getErrorByKey as jest.Mock).mockImplementation(() => ({
      error: { status: 100 },
    }));
    const { res: mockRes } = getMockRes();
    const error = {
      message: 'internal_DB_Connection_Failed',
    };

    errorHandler(error, mockReq, mockRes, mockNext);

    expect(getErrorByKey).toHaveBeenCalled();
    expect(getErrorByKey).toHaveBeenCalledWith(error.message);
    expect(mockRes.status).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(100);
    expect(mockRes.send).toHaveBeenCalled();
    expect(mockRes.send).toHaveBeenCalledWith({
      error: { status: 100 },
    });
  });

  test('Should get the error message when errorHandler is called and send a simple error message', () => {
    (getErrorByKey as jest.Mock).mockImplementation(() => ({
      error: { status: 100 },
    }));
    const { res: mockRes } = getMockRes();
    const error = 'internal_DB_Connection_Failed';

    errorHandler(error, mockReq, mockRes, mockNext);

    expect(getErrorByKey).toHaveBeenCalled();
    expect(getErrorByKey).toHaveBeenCalledWith(error);
    expect(mockRes.status).toHaveBeenCalledWith(100);
    expect(mockRes.send).toHaveBeenCalled();
    expect(mockRes.send).toHaveBeenCalledWith({
      error: { status: 100 },
    });
  });
});
