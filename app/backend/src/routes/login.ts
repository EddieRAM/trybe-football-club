import { Router } from 'express';

import loginController from '../controllers/loginController';

import loginValidation from '../middlewares/loginValidation';

const loginRouter = Router();

loginRouter.post('/', loginValidation, loginController.create);

loginRouter.get('/validate', loginController.getRole);

export default loginRouter;
