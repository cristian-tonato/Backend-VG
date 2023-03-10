import { SECRET } from '../config.js';
import jwt from 'jsonwebtoken';
import bc from 'bcryptjs';

export const getSecret = (secret = SECRET) => {
    if (typeof secret !== 'string' || secret === '') {
        throw new Error('Bad Secret for token creation');
    }
    return secret;
};
export type TokenPayLoad = {
    id: string;
    name: string;
    lastName: string;
    email: string;
};

export const createToken = (payload: TokenPayLoad) => {
    return jwt.sign(payload, getSecret());
};

export const readToken = (token: string) => {
    const payload = jwt.verify(token, getSecret());
    return payload as jwt.JwtPayload;
};
// export const verifyToken = (token: string) => {
//     const payload = jwt.verify(token, getSecret());
//     return payload as jwt.JwtPayload;
// };

export const passwordEncrypt = (password: string) => {
    return bc.hash(password, 10);
};

export const validatePassword = (newPassword: string, hash: string) => {
    return bc.compare(newPassword, hash);
};
