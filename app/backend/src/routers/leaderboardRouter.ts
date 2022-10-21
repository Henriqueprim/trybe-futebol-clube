import * as express from 'express';
import LeaderboardControllers from '../controllers/leaderboardController';

const leaderboardRouter = express();

leaderboardRouter.get('/home', LeaderboardControllers.getAllHome);
leaderboardRouter.get('/away', LeaderboardControllers.getAllAway);

export default leaderboardRouter;
