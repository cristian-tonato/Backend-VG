import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../interface/custom.error';
import { errorManager } from './error';

describe('Given the ErrorManager', () => {
    const req = {};
    const res = {
        status: jest.fn().mockReturnValue({}),
        json: jest.fn().mockReturnValue({}),
        end: jest.fn().mockReturnValue({}),
    };
    const next = jest.fn();
    const mockError = {
        name: 'Error',
        statusCode: 500,
        statusMessage: 'Internal Server Error',
        message: 'Error',
    };
    describe('When it`s call', () => {
        test('Then it call next function', () => {
            errorManager(
                mockError,
                req as Request,
                res as unknown as Response,
                next as NextFunction
            );
            expect(res.status).toBeCalled();
        });
        test('If error.name is Service Unavaiable, it`s status code 503', () => {
            mockError.name = 'Service Unavailable';
            errorManager(
                mockError,
                req as Request,
                res as unknown as Response,
                next as NextFunction
            );
            expect(res.status).toBeCalled();
        });
        test('if there isn´t error.statusCode then it should return a status 500', () => {
            const mockWrongError = {
                name: 'Error',
                statusCode: 'Internal Server Error',
                message: 'Error',
            };
            errorManager(
                mockWrongError as unknown as CustomError,
                req as Request,
                res as unknown as Response,
                next as NextFunction
            );
            expect(res.status).toBeCalled();
        });
    });
    describe('when the name of the error is ValidationError', () => {
        test('If error.name is Validation Error, should call next function with status 406', () => {
            mockError.name = 'Validation Error';
            errorManager(
                mockError,
                req as Request,
                res as unknown as Response,
                next as NextFunction
            );
            expect(res.status).toBeCalled();
        });
    });
});
