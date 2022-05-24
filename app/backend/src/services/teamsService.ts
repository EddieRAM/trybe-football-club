import Teams from '../database/models/Teams';

export default class TeamsService {
  public static async getAllTeams() {
    return Teams.findAll();
  }

  public static async getTeamById(id: number) {
    return Teams.findByPk(id);
  }
}
