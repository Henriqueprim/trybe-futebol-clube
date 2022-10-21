import { Router } from 'express';
import loginRouter from './loginRouter';
import teamRouter from './teamRouter';
import matchRouter from './matchRouter';
import leaderboardRouter from './leaderboardRouter';

const routes = Router();

routes.use('/login', loginRouter);
routes.use('/teams', teamRouter);
routes.use('/matches', matchRouter);
routes.use('/leaderboard', leaderboardRouter);

export default routes;
