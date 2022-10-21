import * as express from 'express';
import { validateExistence } from '../helpers/token';
import LoginController from '../controllers/LoginController';
import loginValidations from '../middlewares/loginValidations';

const validations = [
  loginValidations.emailValidation,
  loginValidations.passwordValidation,
];

const loginRouter = express();

loginRouter.post('/', validations, LoginController.login);
loginRouter.get('/validate', validateExistence, LoginController.getUserRole);

export default loginRouter;
