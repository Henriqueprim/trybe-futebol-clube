import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';

const { JWT_SECRET } = process.env;

const generateToken = async (email: string) => {
  const token = jwt.sign({ email }, JWT_SECRET as string, {
    expiresIn: '3d',
    algorithm: 'HS256',
  });
  return token;
};

const validateExistence = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }
  next();
};

const validateToken = async (token: string) => {
  try {
    const validated = await jwt.verify(token, JWT_SECRET as string);
    const decoded = validated as jwt.JwtPayload;
    return decoded;
  } catch (error) {
    return false;
  }
};

export {
  generateToken,
  validateExistence,
  validateToken,
};
