import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcryptjs';
import loginServices from '../services/loginServices';

const emailValidation = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  const user = await loginServices.login(email);
  if (!email) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  if (!user) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }
  next();
};

const passwordValidation = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const user = await loginServices.login(email);

  if (!password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  if (!bcrypt.compareSync(password, user?.password as string)) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }
  next();
};

export default {
  emailValidation,
  passwordValidation,
};
