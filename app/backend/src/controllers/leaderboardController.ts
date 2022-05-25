import { Request, Response } from 'express';
import leaderboardService from '../services/leaderboardService';

export default class LeaderBoardController {
  public static getAll = async (_req: Request, res: Response) => {
    const allTeamsStats = await leaderboardService.getAll();

    return res.status(200).json(allTeamsStats);
  };

  public static getHomeTeams = async (_req: Request, res: Response) => {
    const homeTeamsStats = await leaderboardService.homeTeamScore();

    return res.status(200).json(homeTeamsStats);
  };

  public static getAwayTeams = async (_req: Request, res: Response) => {
    const awayTeamsStats = await leaderboardService.awayTeamScore();

    return res.status(200).json(awayTeamsStats);
  };
}
