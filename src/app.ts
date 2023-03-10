import { errorManager } from './middleware/error.js';
import express from 'express';
import morgan from 'morgan';
import { gamesRouter } from './router/games.js';
import { usersRouter } from './router/user.js';
import cors from 'cors';
import { setCors } from './middleware/cors.js';

export const app = express();
app.use(cors());
// app.disable('x-porwered-by');
// const corsOptions = {
//     origin: 'trustedwebsite.com',
// };

app.use(morgan('dev'));
// app.use(cors(corsOptions));
app.use(express.json());
//app.use(setCors);

app.get('/', (_req, res) => {
    res.send('api PRUEBA GAMES').end();
});

app.use('/games', gamesRouter);
app.use('/users', usersRouter);

app.use(errorManager);
