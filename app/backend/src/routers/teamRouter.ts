import * as express from 'express';
import TeamController from '../controllers/TeamController';

const teamRouter = express();

teamRouter.get('/', TeamController.getAll);
teamRouter.get('/:id', TeamController.getById);

export default teamRouter;
