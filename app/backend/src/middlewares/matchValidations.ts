import { Request, Response, NextFunction } from 'express';
import { validateToken } from '../helpers/token';
import Team from '../database/models/team';

const matchValidation = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;
  const home = await Team.findByPk(Number(homeTeam));
  const away = await Team.findByPk(Number(awayTeam));
  if (!home || !away) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }
  if (home === away) {
    return res.status(401)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }
  next();
};

const tokenValidation = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  const validatedToken = validateToken(authorization as string);
  if (!authorization || !validatedToken) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  next();
};

export {
  matchValidation,
  tokenValidation,
};
