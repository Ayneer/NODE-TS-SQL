import { requestResponse } from '../response.manager';

describe('Response Manager Suit Tests', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Should wrapper the response in data when requestResponse is called', () => {
        const response = { message: 'any response' };
        const res = requestResponse(response);
        expect(res.data).toEqual(response);
    });
});
