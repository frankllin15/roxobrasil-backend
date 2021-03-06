import { Injectable } from '@nestjs/common';
import { AuthHelper } from 'src/auth/auth.helper';
import {
  DeleteUserInput,
  IdInput,
  NewUserInput,
  UpdateUserInput,
  User,
} from 'src/graphql';
// import { dateNow } from 'src/helpers/moment.helper';
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

    address;
    if (address?.code) address.default = true;

    const hashedPassword = await AuthHelper.hash(password);

    return this.prisma.user.create({
      data: {
        ...data,
        id: uuid(),
        password: hashedPassword,
        roles: {
          connect: roles.map((e) => ({ id: e })) || [],
        },
        address:
          Object.keys(address || {}).length > 0
            ? { create: { ...address, id: uuid() } }
            : {},
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

  // public async createAddress(input: NewAddress): Promise<Address> {
  //   return await this.prisma.user.update({where: {id: input.id}})
  // }

  public async getUserAddress(input: IdInput) {
    return await this.prisma.address.findMany({
      where: { user_id: input.id },
      // include: { user: false },
    });
  }

  public async deleteAddress(input: IdInput): Promise<void> {
    await this.prisma.address.delete({ where: { id: input.id } });
  }

  public async getUserCart(input: IdInput): Promise<any> {
    return await this.prisma.cart.findFirst({
      where: { user_id: input.id },
      include: { products: { include: { assets: true } } },
    });
  }
}
