import { Router } from 'express';
import leaderboardController from '../controllers/leaderboardController';

const leaderboardRouter = Router();

leaderboardRouter.get('/home', leaderboardController.getHomeTeams);
leaderboardRouter.get('/away', leaderboardController.getAwayTeams);
leaderboardRouter.get('/', leaderboardController.getAll);

export default leaderboardRouter;
