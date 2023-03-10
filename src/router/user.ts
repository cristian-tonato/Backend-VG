import { Router } from 'express';
import { UsersController } from '../controllers/user.controller.js';
import { logged } from '../middleware/interceptor.js';
import { GamesRespository } from '../repository/games.repo.js';
import { UserRepository } from '../repository/user.repository.js';

export const usersRouter = Router();
const userController = new UsersController(
    UserRepository.getInstance(),
    GamesRespository.getInstance()
);

usersRouter.post('/register', userController.register.bind(userController));
usersRouter.post('/login', userController.login.bind(userController));
usersRouter.get('/:id', userController.get.bind(userController));
usersRouter.patch(
    '/addfav/:id',
    logged,
    userController.addFav.bind(userController)
);
usersRouter.patch(
    '/delfav/:id',
    logged,
    userController.deleteFav.bind(userController)
);
usersRouter.delete('/:id', logged, userController.delete.bind(userController));
