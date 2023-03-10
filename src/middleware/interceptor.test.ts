import { HTTPError } from './../interface/custom.error.js';
import { logged, RequestPayload } from './interceptor.js';
import { NextFunction, Request, Response } from 'express';

describe('Given the logged', () => {
    describe('When is called', () => {
        test('When the authString is empty, should return an error', () => {
            const req: Partial<Request> = {
                get: jest.fn().mockReturnValueOnce(false),
            };
            const res: Partial<Response> = {};
            const next: NextFunction = jest.fn();
            logged(req as Request, res as Response, next);
            expect(next).toHaveBeenCalled();
        });
        test('When authString is empty, it´s should create error', () => {
            const req: Partial<Request> = {
                get: jest.fn().mockReturnValueOnce(false),
            };
            const res: Partial<Response> = {};
            const next: NextFunction = jest.fn();
            logged(req as Request, res as Response, next);
            expect(next).toHaveBeenCalledWith(
                new HTTPError(403, 'Forbidden', 'Password is wrong')
            );
        });
    });
    // describe('when user is authorize', () => {
    //     const req: Partial<RequestPayload> = {
    //         get: jest
    //             .fn()
    //             .mockReturnValueOnce(
    //                 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzODhjYTBhODRiMWE4YjRiMDMzNzA0NyIsIm5hbWUiOiJtaXJleWEiLCJsYXN0X25hbWUiOiJjaGFwYXJybyIsImVtYWlsIjoibWlyZXlhQGdtYWlsLmNvbSIsImlhdCI6MTY2OTk5MzA0MH0.RNVAjxZMapi8uWYdFiTmAzN2Ho4AanlD8LO7FB9MNA8'
    //             ),
    //     };
    //     const res: Partial<Response> = {};
    //     const next: NextFunction = jest.fn();
    //     test('then it returns the payload', () => {
    //         logged(req as RequestPayload, res as Response, next);
    //         expect(next).toHaveBeenCalled();

    //         expect(req.payload).toStrictEqual({
    //             email: 'pepebot@gmail.com',
    //             id: expect.any(String),
    //             lastName: 'Lopez',
    //             name: 'Pepe',
    //         });
    //     });
    // });
});
