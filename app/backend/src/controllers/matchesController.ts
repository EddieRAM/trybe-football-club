import { Request, Response } from 'express';
import MatchesService from '../services/matchesService';
import { isValidToken } from '../helpers/JWT';

export default class ControllerMatches {
  public static async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;

    const allMatches = await MatchesService.getAllMatches(inProgress as string | undefined);

    return res.status(200).json(allMatches);
  }

  public static async create(req: Request, res: Response) {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;

    if (homeTeam === awayTeam) {
      return res.status(401)

        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    const token: any = req.headers.authorization;

    const validate: any = isValidToken(token);

    if (!validate) return res.status(401).json({ message: 'Invalid token' });

    const newMatch = await MatchesService.createMatch({
      homeTeam: homeTeam === 0 ? 1 : homeTeam,
      awayTeam: awayTeam === 0 ? 1 : awayTeam,
      homeTeamGoals,
      awayTeamGoals });

    if (!newMatch) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }

    return res.status(201).json(newMatch);
  }

  public static async update(req: Request, res: Response) {
    const { id } = req.params;

    const { homeTeamGoals, awayTeamGoals } = req.body;

    await MatchesService.updateMatch(id, homeTeamGoals, awayTeamGoals);

    res.status(200).json({ message: 'Updated' });
  }

  public static async modify(req: Request, res: Response) {
    const { id } = req.params;

    await MatchesService.modifyMatch(Number(id));

    return res.status(200).json('Finished');
  }
}
