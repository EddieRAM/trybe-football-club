import { NextFunction, Request, Response } from 'express';

import loginValidation from '../schemas/loginValidation';

export default (

  req:Request,
  res: Response,
  next: NextFunction,

) => {
  const { email, password } = req.body;

  const { error } = loginValidation.validate({ email, password });

  if (error) {
    const [code, message] = error.message.split('|');

    return res.status(Number(code)).json({ message });
  }

  return next();
};
