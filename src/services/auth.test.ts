import {
    createToken,
    getSecret,
    passwordEncrypt,
    validatePassword,
    readToken,
} from './auth';
import jwt from 'jsonwebtoken';
import bc from 'bcryptjs';
import { SECRET } from '../config';

const mock = {
    name: 'Pepe',
    id: '3',
    role: 'user',
    lastName: 'PepeBot',
    email: 'pepebot@gmail.com',
};

describe('Given createToken ', () => {
    test('Then...', () => {
        const signSpy = jest.spyOn(jwt, 'sign');
        const r = createToken(mock);
        expect(typeof r).toBe('string');
        expect(signSpy).toHaveBeenCalledWith(mock, SECRET);
    });
});

describe('Given readToken ', () => {
    describe('Whne token is valid', () => {
        const token = createToken(mock);
        test('Then', () => {
            const r = readToken(token);
            expect(r.name).toEqual(mock.name);
        });
    });

    describe('Whne secret is not valid', () => {
        test('should be an error', () => {
            process.env.SECRET = '';
            expect(() => {
                getSecret(process.env.SECRET);
            }).toThrow();
        });
    });

    describe('Whne token is not valid', () => {
        const token =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlBlcGUiLCJpYXQiOjE2Njg3NzMwNTB9.DGdcCXGRUS4SaCMyY5RSy-8v9tylvmV_HE1rQJGYJ_5';
        test('should', () => {
            expect(() => {
                readToken(token);
            }).toThrow();
        });
    });

    describe('Whne token is bad formatted', () => {
        const token = 'soy un token';
        test('should', () => {
            expect(() => {
                readToken(token);
            }).toThrow();
        });
    });

    describe('When passwEncrypt...', () => {
        test('should', async () => {
            const singSpy = jest.spyOn(bc, 'hash');
            const result = await passwordEncrypt('pepe');
            expect(typeof result).toBe('string');
            expect(singSpy).toHaveBeenCalled();
        });
    });

    describe('When validatePassword...', () => {
        test('should', async () => {
            const singSpy = jest.spyOn(bc, 'compare');
            const encript = await passwordEncrypt('pepe');
            const result = await validatePassword('pepe', encript);
            expect(result).toBe(true);
            expect(singSpy).toHaveBeenCalled();
        });
    });
});
