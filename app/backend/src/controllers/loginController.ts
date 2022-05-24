import { Response, Request } from 'express';
import LoginService from '../services/loginService';
import { isValidToken } from '../helpers/JWT';

export default class LoginController {
  constructor(private loginService = new LoginService()) {}

  public static async create(req: Request, res: Response) {
    const { email } = req.body;

    const user = await LoginService.create(email);

    if (user.message) return res.status(user.code).json({ message: user.message });

    return res.status(200).json(user);
  }

  public static getRole(req: Request, res: Response) {
    const token: any = req.headers.authorization;

    const getRole: any = isValidToken(token);

    res.status(200).json(getRole.data);
  }
}
