import Team from '../database/models/team';
import Match from '../database/models/match';
import { IMatch } from '../interfaces/leaderboardInterface';
import homeMatches from '../helpers/leaderboardRules';

export default class LeaderboardServices {
  static async getAllHome() {
    const allHome = await Team.findAll({
      include: {
        model: Match,
        as: 'homeMatch',
        attributes: {
          exclude: ['id', 'homeTeam', 'awayTeam', 'inProgress'],
        },
        where: { inProgress: false },
      },
      attributes: { exclude: ['id'] },
    }) as unknown as IMatch[];
    return homeMatches(allHome);
  }

  static async getAllAway() {
    const matches = await Team.findAll({
      include: {
        model: Match,
        as: 'awayMatch',
        attributes: {
          exclude: ['id', 'homeTeam', 'awayTeam', 'inProgress'],
        },
        where: { inProgress: false },
      },
      attributes: { exclude: ['id'] },
    }) as unknown as IMatch[];
    return homeMatches(matches);
  }
}
