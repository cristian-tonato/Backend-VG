import { IGames } from './../entities/games';
import { GamesRepo, UserRepo } from './../repository/repo.js';
import { RequestPayload } from './../middleware/interceptor.js';
import { createToken, validatePassword } from './../services/auth.js';
import { NextFunction, Request, Response } from 'express';
import { HTTPError } from '../interface/custom.error.js';

import { IUser } from '../entities/user';

export class UsersController {
    constructor(
        public readonly userRepo: UserRepo<IUser>,
        public readonly gamesRepo: GamesRepo<IGames>
    ) {}
    async register(req: Request, res: Response, next: NextFunction) {
        console.log(req.body);

        try {
            //console.log(this.register);
            const user = await this.userRepo.create(req.body);
            res.status(201);
            res.json({ user });
        } catch (error) {
            const httpError = new HTTPError(
                503,
                'Service unavailable',
                (error as Error).message
            );
            next(httpError);
        }
    }
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            //console.log('login', req.body);
            const user = await this.userRepo.find({
                email: req.body.email,
            });
            //console.log(user, 'Hola');
            const isPasswordValid = await validatePassword(
                req.body.password,
                user.password
            );
            if (!isPasswordValid) throw new Error('password is wrong');
            const token = createToken({
                id: user.id.toString(),
                name: user.name,
                email: user.email,
                lastName: '',
            });
            res.status(201);
            res.json({ token, user });
        } catch (error) {
            next(this.createHttpError(error as Error));
        }
    }
    async get(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await this.userRepo.get(req.params.id);
            res.json({ user });
        } catch (error) {
            const httpError = new HTTPError(
                503,
                'Service unavailable',
                (error as Error).message
            );
            next(httpError);
        }
    }
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            await this.userRepo.destroy(req.params.id);
            res.status(201);
            res.json({ id: req.params.id });
        } catch (error) {
            next(this.createHttpError(error as Error));
        }
    }
    async addFav(req: RequestPayload, res: Response, next: NextFunction) {
        try {
            console.log('patch', req.params.id, req.payload);
            if (!req.payload) {
                throw new Error('Invalid Payload');
            }
            const gameFav = await this.gamesRepo.get(req.params.id);

            const user = await this.userRepo.get(req.payload.id);

            if (user.favorites.toString().includes(req.params.id))
                throw new Error('this game is already in your favorites');

            user.favorites.push(gameFav.id);

            this.userRepo.update(user.id.toString(), {
                favorites: user.favorites,
            });
            res.json(gameFav);
        } catch (error) {
            const httpError = new HTTPError(
                503,
                'Service unavailable',
                (error as Error).message
            );
            next(httpError);
        }
    }

    async deleteFav(req: RequestPayload, res: Response, next: NextFunction) {
        try {
            if (!req.payload) throw new Error('Invalid payload');
            const user = await this.userRepo.get(req.payload.id);

            const deleteGame = user.favorites.filter(
                (game) => game.id.toString() !== req.params.id
            );

            user.favorites = user.favorites.filter(
                (item) => item.id.toString() !== req.params.id
            );

            this.userRepo.update(user.id.toString(), {
                favorites: user.favorites,
            });

            res.json({ user });
        } catch (error) {
            const httpError = new HTTPError(
                503,
                'Service unavailable',
                (error as Error).message
            );
            next(httpError);
        }
    }

    createHttpError(error: Error) {
        if (error.message === 'Not found id') {
            const httpError = new HTTPError(404, 'Not Found', error.message);
            return httpError;
        }
        const httpError = new HTTPError(
            503,
            'Service unavailable',
            error.message
        );
        return httpError;
    }
}
