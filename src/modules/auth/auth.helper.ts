import { compare, hash } from 'bcryptjs';

export class AuthHelper {
  static hash(password) {
    return hash(password, 10);
  }

  static validate(password: string, hashedPassword): Promise<boolean> {
    return compare(password, hashedPassword);
  }
}
