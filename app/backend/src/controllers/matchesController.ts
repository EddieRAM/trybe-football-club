import { Request, Response } from 'express';
import MatchesService from '../services/matchesService';

export default class ControllerMatches {
  public static async getAll(_req: Request, res: Response) {
    const allMatches = await MatchesService.getAllMatches();

    return res.status(200).json(allMatches);
  }
}
