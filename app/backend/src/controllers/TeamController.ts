import { Request, Response } from 'express';
import TeamServices from '../services/teamServices';

export default class TeamController {
  static async getAll(_req: Request, res: Response) {
    const allTeams = await TeamServices.getAll();
    return res.status(200).json(allTeams);
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params;
    const team = await TeamServices.getById(Number(id));
    return res.status(200).json(team);
  }
}
