import Match from '../database/models/Matches';
import Team from '../database/models/Teams';
import TeamStatistics from './teamsStatistics';

export default class LeaderBoardServices {
  public static async homeTeamScore() {
    const allMatches = await Match.findAll();

    const allTeams = await Team.findAll();

    const sortedBalance: TeamStatistics[] = [];

    allTeams.forEach((team) => {
      const table = allMatches
        .filter((match) => match.homeTeam === team.id && match.inProgress === false)
        .map((match) => ({
          goalsFavor: match.homeTeamGoals,
          goalsOwn: match.awayTeamGoals }));

      const balance = new TeamStatistics({ teamName: team.teamName, matches: table });

      sortedBalance.push(balance);
    });

    return this.sortBalance(sortedBalance);
  }

  public static async awayTeamScore() {
    const allMatches = await Match.findAll();

    const allTeams = await Team.findAll();

    const sortedBalance: TeamStatistics[] = [];

    allTeams.forEach((team) => {
      const teste = allMatches
        .filter((match) => match.awayTeam === team.id && match.inProgress === false)
        .map((match) => ({
          goalsFavor: match.awayTeamGoals,
          goalsOwn: match.homeTeamGoals }));

      const balance = new TeamStatistics({ teamName: team.teamName, matches: teste });

      sortedBalance.push(balance);
    });

    return this.sortBalance(sortedBalance);
  }

  public static async getAll() {
    const allMatches = await Match.findAll();
    const allTeams = await Team.findAll();
    const sortedBalance: TeamStatistics[] = [];

    allTeams.forEach((team) => {
      let homeGames = allMatches
        .filter((match) => match.homeTeam === team.id && match.inProgress === false)
        .map((match) => ({
          goalsFavor: match.homeTeamGoals,
          goalsOwn: match.awayTeamGoals }));

      const awayGames = allMatches
        .filter((match) => match.awayTeam === team.id && match.inProgress === false)
        .map((match) => ({
          goalsFavor: match.awayTeamGoals, goalsOwn: match.homeTeamGoals }));
      homeGames = [...homeGames, ...awayGames];
      const balance = new TeamStatistics({ teamName: team.teamName, matches: homeGames });
      sortedBalance.push(balance);
    });
    return this.sortBalance(sortedBalance);
  }

  private static sortBalance(array: TeamStatistics[]) {
    return array.sort((TeamA, TeamB) => {
      if (TeamA.totalPoints < TeamB.totalPoints) return 1;

      if (TeamA.totalPoints > TeamB.totalPoints) return -1;

      if (TeamA.goalsBalance < TeamB.goalsBalance) return 1;

      if (TeamA.goalsBalance > TeamB.goalsBalance) return -1;

      if (TeamA.goalsFavor < TeamB.goalsFavor) return 1;

      if (TeamA.goalsFavor > TeamB.goalsFavor) return -1;

      return 0;
    });
  }
}
