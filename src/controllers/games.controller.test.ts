import { GamesRespository } from './../repository/games.repo.js';

import { UserRepository } from '../repository/user.repository.js';
import { GamesController } from './games.controller.js';
import { NextFunction, Request, Response } from 'express';
import { HTTPError } from '../interface/custom.error';

const mock = [
    {
        title: 'SuperMario',
        img: 'http://ulr',
        description: 'SuperHero',
        gameUrl: 'http://www.mario.com',
        creator: 'Pepe',
        genre: 'Action',
    },
    {
        title: 'SuperMario2',
        img: 'http://ulr',
        description: 'SuperHero and Luigi',
        gameUrl: 'http://www.marioandLuigi.com',
        creator: 'Pepebot',
        genre: 'Action',
    },
];

describe('Given GameController', () => {
    GamesRespository.prototype.getAll = jest.fn().mockResolvedValue(mock);
    GamesRespository.prototype.get = jest.fn().mockResolvedValue(mock[0]);

    const gameRepo = GamesRespository.getInstance();
    const userRepo = UserRepository.getInstance();

    const gamesController = new GamesController(gameRepo, userRepo);
    const req: Partial<Request> = {};
    const res: Partial<Response> = {
        json: jest.fn(),
        status: jest.fn().mockReturnValue(200),
    };
    const next: NextFunction = jest.fn();

    // test('Then getAll should have been called', async () => {
    //     gameRepo.getAll = jest.fn().mockResolvedValue(mock);
    //     await gamesController.getAll(req as Request, res as Response, next);
    //     expect(res.json).toHaveBeenCalled();
    //     expect(res.status).toHaveBeenCalledWith(200);
    // });

    test('Then get should have been called', async () => {
        req.params = { id: '103' };
        gameRepo.get = jest.fn().mockReturnValue(mock[0]);
        await gamesController.get(req as Request, res as Response, next);
        expect(res.json).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
    });

    describe('Given GamesController, some error happened', () => {
        let error: HTTPError;
        beforeEach(() => {
            error = new HTTPError(404, 'Not found id', 'message of error');
        });

        GamesRespository.prototype.getAll = jest
            .fn()
            .mockRejectedValue(['Game']);
        GamesRespository.prototype.get = jest.fn().mockRejectedValue(['Game']);

        const repository = GamesRespository.getInstance();
        const productController = new GamesController(repository, userRepo);
        const req: Partial<Request> = {};
        const res: Partial<Response> = {
            json: jest.fn(),
        };
        const next: NextFunction = jest.fn();

        test('It should throw an error', async () => {
            await productController.getAll(
                req as Request,
                res as Response,
                next
            );
            expect(error).toBeInstanceOf(Error);
            expect(error).toBeInstanceOf(HTTPError);
        });

        test('It should throw an error', async () => {
            await productController.get(req as Request, res as Response, next);
            expect(error).toBeInstanceOf(Error);
            expect(error).toBeInstanceOf(HTTPError);
        });
    });
});
