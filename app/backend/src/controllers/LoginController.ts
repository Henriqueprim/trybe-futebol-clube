import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { generateToken, validateToken } from '../helpers/token';
import UserService from '../services/loginServices';

export default class LoginController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const token = await generateToken(email);
      return res.status(200).json({ token });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getUserRole(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = await validateToken(req.headers.authorization as string) as JwtPayload;
      const userRole = await UserService.getUserRole(email);
      return res.status(200).json({ role: userRole });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
