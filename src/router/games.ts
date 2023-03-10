import { UserRepository } from '../repository/user.repository.js';
import { Router } from 'express';
import { GamesController } from '../controllers/games.controller.js';
import { GamesRespository } from '../repository/games.repo.js';

export const gamesRouter = Router();
const controller = new GamesController(
    GamesRespository.getInstance(),
    UserRepository.getInstance()
);

gamesRouter.get('/', controller.getAll.bind(controller));
gamesRouter.get('/:id/', controller.get.bind(controller));
