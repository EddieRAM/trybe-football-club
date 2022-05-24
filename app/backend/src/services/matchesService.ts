import Teams from '../database/models/Teams';
import Matches from '../database/models/Matches';

export default class ServiceMatches {
  public static async getAllMatches() {
    const allMatches = await Matches.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } }],
    });
    return allMatches;
  }
}
