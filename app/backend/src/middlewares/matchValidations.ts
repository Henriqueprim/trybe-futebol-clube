import { Request, Response, NextFunction } from 'express';
import { validateToken } from '../helpers/token';
import Team from '../database/models/team';

const matchValidation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { homeTeam, awayTeam } = req.body;
    const home = await Team.findOne({ where: { id: homeTeam } });
    const away = await Team.findOne({ where: { id: awayTeam } });
    if (home == null || away == null) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
    if (homeTeam === awayTeam) {
      return res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    next();
  } catch (error) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }
};

const tokenValidation = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  const validatedToken = await validateToken(authorization as string);
  if (!validatedToken) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  next();
};

export {
  matchValidation,
  tokenValidation,
};
