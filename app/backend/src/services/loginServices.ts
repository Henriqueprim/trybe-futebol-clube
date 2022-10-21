import User from '../database/models/user';

export default class LoginServices {
  static async login(email: string) {
    const user = await User.findOne({ where: { email } });
    return user;
  }

  static async getUserRole(email: string) {
    const user = await User.findOne({ where: { email } });
    return user?.role as string;
  }
}
