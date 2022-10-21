import { NextFunction, Request, Response } from 'express';
import MatchServices from '../services/matchServices';
import Match from '../database/models/match';

export default class MatchController {
  static async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const allMatches = await MatchServices.getAll();
      return res.status(200).json(allMatches);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const match = req.body;
      const newMatch = await MatchServices.create(match);
      return res.status(200).json(newMatch);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async finish(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const foundMatch = await Match.findByPk(Number(id));
      if (!foundMatch) {
        return res.status(404).json({ message: 'Match not found' });
      }
      const finished = await MatchServices.finishMatch(Number(id));
      if (finished) return res.status(200).json({ message: 'Finished' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { homeTeamGoals, awayTeamGoals } = req.body;
      const updated = await MatchServices.updateMatch(Number(id), homeTeamGoals, awayTeamGoals);
      return res.status(200).json(updated);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
