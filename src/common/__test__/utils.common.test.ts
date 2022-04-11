import { generateBcryptHash, compareBcryptHash, generateJWT, validateJWT } from '../utils';
import { compare, genSalt, hash } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { JWT_SECRET } from '../constants';

jest.mock('bcrypt', () => ({
    genSalt: jest.fn(),
    hash: jest.fn(),
    compare: jest.fn()
}));

jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(),
    verify: jest.fn()
}));

describe('Utils commons Suit Test', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Generate Bcrypt Hash tests', () => {

        test('should generate a hash text when generateBcryptHash is called', async () => {
            const mockText = 'text';
            (genSalt as jest.Mock).mockImplementation(() => Promise.resolve('mockSalt'));
            (hash as jest.Mock).mockImplementation(() => Promise.resolve('mockHash'));

            const res = await generateBcryptHash(mockText);

            expect(genSalt).toHaveBeenCalled();
            expect(hash).toHaveBeenCalled();
            expect(hash).toHaveBeenCalledWith(mockText, 'mockSalt');
            expect(res).toBe('mockHash');
        });

        test('should generate a error when generateBcryptHash is called and genSalt throw an error', async () => {
            const mockText = 'text';
            (genSalt as jest.Mock).mockImplementation(() => Promise.reject({ message: 'error' }));
            (hash as jest.Mock).mockImplementation(() => Promise.resolve('mockHash'));

            await expect(() => generateBcryptHash(mockText)).rejects.toThrow();
            await expect(() => generateBcryptHash(mockText)).rejects.toThrowError('generate_bcrypt_hash_error');
            expect(genSalt).toHaveBeenCalled();
            expect(hash).not.toHaveBeenCalled();
        });

        test('should generate a error when generateBcryptHash is called and hash throw an error', async () => {
            const mockText = 'text';
            (genSalt as jest.Mock).mockImplementation(() => Promise.resolve('mockSalt'));
            (hash as jest.Mock).mockImplementation(() => Promise.reject({ message: 'error' }));

            await expect(() => generateBcryptHash(mockText)).rejects.toThrow();
            await expect(() => generateBcryptHash(mockText)).rejects.toThrowError('generate_bcrypt_hash_error');
            expect(hash).toHaveBeenCalled();
            expect(genSalt).toHaveBeenCalled();
        });

    });

    describe('Compare Bcrypt Hash tests', () => {

        test('should compare a text with a hash successfully when compareBcryptHash is called', async () => {
            const mockText = 'text';
            const mockHash = 'hash';
            (compare as jest.Mock).mockImplementation(() => Promise.resolve(true));

            const res = await compareBcryptHash(mockText, mockHash);

            expect(compare).toHaveBeenCalled();
            expect(compare).toHaveBeenCalledWith(mockText, mockHash);
            expect(res).toBeTruthy();
        });

        test('should generate a error when compareBcryptHash is called and compare throw an error', async () => {
            const mockText = 'text';
            const mockHash = 'hash';
            (compare as jest.Mock).mockImplementation(() => Promise.reject({ message: 'error' }));

            await expect(() => compareBcryptHash(mockText, mockHash)).rejects.toThrow();
            await expect(() => compareBcryptHash(mockText, mockHash)).rejects.toThrowError('generate_bcrypt_hash_error');
            expect(compare).toHaveBeenCalled();
        });

    });

    describe('Generate JWT tests', () => {

        test('should generate a Json Web Token when generateJWT is called', () => {
            const mockText = 'text';
            const mockSign = (sign as jest.Mock).mockImplementation(() => 'token');

            const res = generateJWT(mockText);

            const calls: any[] = mockSign.mock.calls[0];
            expect(sign).toHaveBeenCalled();
            expect(calls[0].data).toBe(mockText);
            expect(res).toBe('token');
        });

        test('should generate a error when generateJWT is called and sign throw an error', () => {
            const mockText = 'text';
            (sign as jest.Mock).mockImplementation(() => { throw new Error('error') });

            expect(() => generateJWT(mockText)).toThrow();
            expect(() => generateJWT(mockText)).toThrowError('token_generation_error');
        });

    });

    describe('Validate JWT tests', () => {

        test('should validate a Json Web Token when validateJWT is called', () => {
            const mockToken = 'text';
            (verify as jest.Mock).mockImplementation(() => ({ data: 'text'}));

            const res = validateJWT(mockToken);

            expect(verify).toHaveBeenCalled();
            expect(verify).toHaveBeenCalledWith(mockToken, JWT_SECRET);
            expect(res).toEqual({ data: 'text'});
        });

        test('should generate a error when validateJWT is called and sign throw an error', () => {
            const mockToken = 'text';
            (verify as jest.Mock).mockImplementation(() => { throw new Error('error') });

            expect(() => validateJWT(mockToken)).toThrow();
            expect(() => validateJWT(mockToken)).toThrowError('invalid_token');
        });

    });
});