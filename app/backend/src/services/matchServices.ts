import Team from '../database/models/team';
import Match from '../database/models/match';

export default class MatchServices {
  static async getAll(): Promise<Match[]> {
    const matches = await Match.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return matches as Match[];
  }

  static async create(match:Match): Promise<Match> {
    const newMatch = await Match.create(
      {
        homeTeam: match.homeTeam,
        awayTeam: match.awayTeam,
        homeTeamGoals: match.homeTeamGoals,
        awayTeamGoals: match.awayTeamGoals,
        inProgress: match.inProgress,
      },
    );
    return newMatch;
  }

  static async filterMatches(inProgress: boolean) {
    const matches = await Match.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
      where: { inProgress } });
    return matches;
  }

  static async finishMatch(id: number) {
    const finished = await Match.update({ inProgress: false }, { where: { id } });
    return finished;
  }

  static async updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    const updated = await Match.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
    return updated;
  }
}
