import { Router } from 'express';

import matchesController from '../controllers/matchesController';

const matchesRouter = Router();

matchesRouter.get('/', matchesController.getAll);

matchesRouter.post('/', matchesController.create);

matchesRouter.patch('/:id', matchesController.update);

matchesRouter.patch('/:id/finish', matchesController.modify);

export default matchesRouter;
