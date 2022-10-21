import * as express from 'express';
import MatchController from '../controllers/MatchController';
import { matchValidation, tokenValidation } from '../middlewares/matchValidations';

const validations = [
  matchValidation,
  tokenValidation,
];

const matchRouter = express();

matchRouter.get('/', MatchController.getAll);
matchRouter.post('/', validations, MatchController.create);
matchRouter.patch('/:id', MatchController.update);
matchRouter.patch('/:id/finish', MatchController.finish);

export default matchRouter;
