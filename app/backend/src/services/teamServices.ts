import Team from '../database/models/team';

export default class TeamServices {
  static async getAll() {
    const allTeams = await Team.findAll();
    return allTeams;
  }

  static async getById(id: number) {
    const team = await Team.findByPk(id);
    return team;
  }
}
