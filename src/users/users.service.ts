import { Injectable } from '@nestjs/common';
import { AuthHelper } from 'src/auth/auth.helper';
import {
  DeleteUserInput,
  NewUserInput,
  UpdateUserInput,
  User,
} from 'src/graphql';
import { dateNow } from 'src/helpers/moment.helper';
import { PrismaService } from 'src/prisma.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  public async getUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email: email },
      include: { roles: true },
    });

    return user;
  }
  public async getUserById(id: string): Promise<User> {
    const user = (await this.prisma.user.findUnique({
      where: { id: id },
      include: { roles: true, address: true },
    })) as User;

    return user;
  }

  public async getUserRolesByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email: email },
      select: { roles: true },
    });

    return user.roles;
  }

  public async getUsers() {
    try {
      const users = await this.prisma.user.findMany({
        include: {
          roles: true,
        },
      });
      return {
        success: true,
        users: users,
      };
    } catch (e) {
      return {
        success: false,
        errors: [
          {
            message: e.message,
            code: e.code,
          },
        ],
      };
    }
  }

  public async createUser(input: NewUserInput) {
    const { password, address, roles, ...data } = input;

    address.default = true;

    const hashedPassword = await AuthHelper.hash(password);

    return this.prisma.user.create({
      data: {
        ...data,
        id: uuid(),
        password: hashedPassword,
        roles: {
          connect: roles.map((e) => ({ id: e })) || [],
        },
        address: { create: { ...address, id: uuid() } },
        created_at: dateNow(),
      },
      include: {
        roles: true,
        address: true,
      },
    });
  }

  public async updateUser(input: UpdateUserInput) {
    const { address, ...data } = input.data;

    if (address.default) {
      await this.prisma.address.updateMany({
        where: { AND: { user_id: input.id, default: true } },
        data: { default: false },
      });
    }

    return (await this.prisma.user.update({
      data: {
        ...data,
        address: { create: { ...address, id: uuid() } },
      },
      where: { id: input.id },
      include: { address: true },
    })) as User;
  }

  public async deleteUser(input: DeleteUserInput) {
    try {
      await this.prisma.user.delete({ where: { id: input.id } });

      return {
        success: true,
      };
    } catch (e) {
      return {
        success: false,
        errors: [
          {
            message: e.message,
            code: e.code,
          },
        ],
      };
    }
  }
}
