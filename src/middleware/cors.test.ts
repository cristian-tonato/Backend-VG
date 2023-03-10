import { setCors } from './cors';
import { NextFunction, Request, Response } from 'express';

describe('Given  the SetCors Middleware', () => {
    describe('When it´s called', () => {
        const req: Partial<Request> = {
            header: jest.fn().mockReturnValue('*'),
        };
        const res: Partial<Response> = {
            setHeader: jest.fn(),
        };
        const next: NextFunction = jest.fn();

        test('Then it should se the Action-Control-Allow-Origin header', () => {
            setCors(req as Request, res as Response, next);
            expect(res.setHeader).toHaveBeenCalledWith(
                'Action-Control-Allow-Origin',
                '*'
            );
        });
        test('If req.header is "Origin", should be value origin as "Origin"', () => {
            req.header = jest.fn().mockReturnValue('Origin');
            setCors(req as Request, res as Response, next);
            expect(res.setHeader).toHaveBeenCalledWith(
                'Action-Control-Allow-Origin',
                'Origin'
            );
        });
    });
});
