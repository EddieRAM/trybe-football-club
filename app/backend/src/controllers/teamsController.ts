import { Request, Response } from 'express';
import TeamsService from '../services/teamsService';

export default class TeamsController {
  public static async getAll(_req: Request, res: Response) {
    const allTeams = await TeamsService.getAllTeams();

    return res.status(200).json(allTeams);
  }

  public static async getById(req: Request, res: Response) {
    const { id } = req.params;

    const teamByID = await TeamsService.getTeamById(Number(id));

    if (!teamByID) return res.status(400).json({ message: 'Team not found' });

    return res.status(200).json(teamByID);
  }
}
