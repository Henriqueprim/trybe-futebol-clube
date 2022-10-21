import { NextFunction, Request, Response } from 'express';
import LeaderboardServices from '../services/leaderboardServices';

export default class LeaderboardControllers {
  static async getAllHome(_req: Request, res: Response, next: NextFunction) {
    try {
      const homeGames = await LeaderboardServices.getAllHome();
      return res.status(200).json(homeGames);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getAllAway(_req: Request, res: Response, next: NextFunction) {
    try {
      const awayGames = await LeaderboardServices.getAllAway();
      return res.status(200).json(awayGames);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
