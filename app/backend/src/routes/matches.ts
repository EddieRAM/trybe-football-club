import { Router } from 'express';

import ControllerMatches from '../controllers/matchesController';

const matchesRouter = Router();

matchesRouter.get('/', ControllerMatches.getAll);

export default matchesRouter;
