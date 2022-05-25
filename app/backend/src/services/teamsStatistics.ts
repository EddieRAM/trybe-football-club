import IMatch from '../interfaces/IMatch';
import IStats from '../interfaces/IStats';

export default class TeamsStatistics {
  public name: string;

  public totalPoints: number;

  public totalGames: number;

  public totalVictories: number;

  public totalDraws: number;

  public totalLosses: number;

  public goalsFavor: number;

  public goalsOwn: number;

  public goalsBalance: number;

  public efficiency: number;

  constructor({ teamName, matches }: IStats) {
    this.name = teamName;

    this.totalPoints = TeamsStatistics.points(matches);

    this.totalGames = matches.length;

    this.totalVictories = TeamsStatistics.victories(matches);

    this.totalDraws = TeamsStatistics.draws(matches);

    this.totalLosses = TeamsStatistics.losses(matches);

    this.goalsFavor = TeamsStatistics.goals(matches);

    this.goalsOwn = TeamsStatistics.ownGoals(matches);

    this.goalsBalance = this.goalsFavor - this.goalsOwn;

    this.efficiency = Number(((this.totalPoints / (matches.length * 3)) * 100).toFixed(2));
  }

  private static points(matches: IMatch[]) {
    return matches.reduce((totalPoints, { goalsFavor, goalsOwn }) => {
      if (goalsFavor > goalsOwn) {
        return totalPoints + 3;
      }

      if (goalsFavor === goalsOwn) {
        return totalPoints + 1;
      }
      return totalPoints;
    }, 0);
  }

  private static victories(matches: IMatch[]) {
    return matches.reduce((totalVictories, { goalsFavor, goalsOwn }) => {
      if (goalsFavor > goalsOwn) {
        return totalVictories + 1;
      }
      return totalVictories;
    }, 0);
  }

  private static draws(matches: IMatch[]) {
    return matches.reduce((totalDraws, { goalsFavor, goalsOwn }) => {
      if (goalsFavor === goalsOwn) {
        return totalDraws + 1;
      }
      return totalDraws;
    }, 0);
  }

  private static losses(matches: IMatch[]) {
    return matches.reduce((totalLosses, { goalsFavor, goalsOwn }) => {
      if (goalsFavor < goalsOwn) {
        return totalLosses + 1;
      }
      return totalLosses;
    }, 0);
  }

  private static goals(matches: IMatch[]) {
    return matches.reduce((totalGoals, { goalsFavor }) => totalGoals + goalsFavor, 0);
  }

  private static ownGoals(matches: IMatch[]) {
    return matches.reduce((totalGoals, { goalsOwn }) => totalGoals + goalsOwn, 0);
  }
}
