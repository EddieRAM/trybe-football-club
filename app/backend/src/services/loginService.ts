import User from '../database/models/User';

import { tokenGen } from '../helpers/JWT';

export default class LoginService {
  public static async create(email:string) {
    const userSearch = await User.findOne({

      where: { email },

      attributes: { exclude: ['password'] },

    });

    if (!userSearch) return { code: 400, message: 'Username or password invalid' };

    const token = tokenGen({ data: userSearch.role });

    return { user: userSearch, token };
  }
}
