import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { HTTPError } from '../interface/custom.error.js';
import { readToken } from '../services/auth.js';

export interface RequestPayload extends Request {
    payload?: JwtPayload;
}
export const logged = (
    req: RequestPayload,
    res: Response,
    next: NextFunction
) => {
    console.log('logged');
    const authString = req.get('Authorization');

    try {
        if (!authString || !authString?.startsWith('Bearer')) {
            throw new HTTPError(403, 'Forbidden', 'Password is wrong');
        }
        const token = authString.slice(7);
        req.payload = readToken(token);
        next();
    } catch (error) {
        next(new HTTPError(403, 'Forbidden', 'Password is wrong'));
    }
};
