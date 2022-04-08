import { getErrorByKey } from '../../managers/error.manager';

describe('Error Manager Suit Tests', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Should get the error object when getErrorByKey is called', () => {
        const errorKey = 'internal_DB_Connection_Failed';

        const res = getErrorByKey(errorKey);

        expect(res.error.title).toBe(errorKey);
        expect(res.error.code).toBe('SW-0001');
        expect(res.error.status).toBe(500);
        expect(res.error.message).toBe('Error to try connect to database');
    });

    test('Should get the unknown error object when getErrorByKey is called', () => {
        const errorKey = '';

        const res = getErrorByKey(errorKey);

        expect(res.error.title).toBe(errorKey);
        expect(res.error.code).toBe('SW-0000');
        expect(res.error.status).toBe(500);
        expect(res.error.message).toBe('Unknown Error');
    });
});
