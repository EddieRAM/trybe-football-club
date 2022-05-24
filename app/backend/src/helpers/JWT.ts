import * as jwt from 'jsonwebtoken';

import * as fs from 'fs';

// file reader

const secret = fs.readFileSync('jwt.evaluation.key', 'utf8');

// JWT generator

const tokenGen = (payload: any): string => {
  const token = jwt.sign(payload, secret, {

    expiresIn: '15d',

  });
  return token;
};

// token validator

const isValidToken = (token: string) => {
  try {
    const decode = jwt.verify(token, secret);

    return decode;
  } catch (error) {
    console.log(error);
  }
};

export {

  tokenGen,
  isValidToken,

};
