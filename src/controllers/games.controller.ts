import { NextFunction, Request, Response } from 'express';
import { HTTPError } from '../interface/custom.error.js';
import { UserRepository } from '../repository/user.repository.js';
import { GamesRespository } from '../repository/games.repo.js';

export class GamesController {
    constructor(
        public readonly gamesRespo: GamesRespository,
        public readonly userRespo: UserRepository
    ) {}
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const games = await this.gamesRespo.getAll();
            res.json({ games });
            //console.log(games);
        } catch (error) {
            next(this.createHttpError(error as Error));
        }
    }
    async get(req: Request, res: Response, next: NextFunction) {
        try {
            console.log('get', this.get);
            const games = await this.gamesRespo.get(req.params.id);
            res.status(200);
            res.json({ games });
        } catch (error) {
            next(this.createHttpError(error as Error));
        }
    }

    createHttpError(error: Error) {
        if (error.message === 'Not found ID') {
            const httpError = new HTTPError(404, 'Not found', error.message);
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
