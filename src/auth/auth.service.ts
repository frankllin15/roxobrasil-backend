/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import {
  CreateUserResult,
  LoginInput,
  LoginResult,
  NewUserInput,
  User,
} from 'src/graphql';
import { JwtService } from '@nestjs/jwt';
import { JwtDto } from './dto/Jwt.dto';
import { AuthHelper } from './auth.helper';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersServices: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string): Promise<User | null> {
    const user = await this.usersServices.getUserByEmail(email);

    if (!user) return null;

    return user;
  }

  async login(input: LoginInput): Promise<LoginResult> {
    const found = await this.usersServices.getUserByEmail(input.email);

    if (!found) {
      throw new NotFoundException('Invalid email');
    }

    console.log(input);

    const isPasswordValid = await AuthHelper.validate(
      input.password,
      found.password,
    );
    console.log(isPasswordValid);

    if (!isPasswordValid) {
      throw new NotFoundException('Invalid email or password');
    }
    return {
      user: found,
      access_token: this.signToken(found.email),
    };
  }

  async register(input: NewUserInput) {
    const user = await this.usersServices.createUser(input);

    return {
      user,
      access_token: this.signToken(user.email),
    };
  }

  private signToken(email: string) {
    const payload: JwtDto = {
      email: email,
    };

    return this.jwtService.sign(payload);
  }
}
