import Teams from '../database/models/Teams';

import Matches from '../database/models/Matches';

export default class ServiceMatches {
  public static async getAllMatches(matchInProgress: string | undefined) {
    if (matchInProgress === undefined) {
      const allMatches = await Matches.findAll({

        include: [
          { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
          { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
        ],

      });

      return allMatches;
    }
  }

  public static matchInProgress = async (progressInput: string) => {
    let isInProgress: boolean;

    if (progressInput === 'true') isInProgress = true;

    else isInProgress = false;

    const allInProgressMatches = await Matches.findAll({

      where: { inProgress: isInProgress },

      include: [
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],

    });

    return allInProgressMatches;
  };

  public static async createMatch({
    homeTeam,
    awayTeam,
    homeTeamGoals,
    awayTeamGoals,
  }: any) {
    const homeTeamId = await Teams.findByPk(homeTeam);
    const awayTeamId = await Teams.findByPk(awayTeam);

    if (!(homeTeamId && awayTeamId)) {
      return false;
    }

    const inProgress = true;
    const newMatch = await Matches
      .create({ homeTeam,
        homeTeamGoals,
        awayTeam,
        awayTeamGoals,
        inProgress });

    return newMatch;
  }

  public static async updateMatch(id: string, homeTeamGoals: number, awayTeamGoals: number) {
    await Matches.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }

  public static async modifyMatch(id: number) {
    await Matches.update({ inProgress: false }, { where: { id } });
  }
}
