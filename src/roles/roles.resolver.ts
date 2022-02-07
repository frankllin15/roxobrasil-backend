import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from 'src/auth/auth.service';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { AddRoleUserInput, NewRole } from 'src/graphql';
import { GraphqlHelper } from 'src/helpers/graphql.helper';
import { PrismaService } from 'src/prisma.service';
import { Roles } from './roles.decorator';
import { RolesEnum } from './roles.enum';
import { RolesGuard } from './roles.guard';

@Resolver('Roles')
// @UseGuards(RolesGuard)
// @UseGuards(GqlAuthGuard)
export class RolesResolver {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
  ) {}

  @Query('roles')
  @Roles(RolesEnum.ADMIN)
  async roles() {
    try {
      const roles = this.prisma.role.findMany();

      return {
        roles,
        success: true,
        errors: [],
      };
    } catch (e) {
      return GraphqlHelper.createGenericErrorResult(e);
    }
  }

  @Mutation('createRole')
  async createRoles(@Args('input') args: NewRole) {
    try {
      const id = Math.floor(1000 + Math.random() * 9000).toString();
      const role = await this.prisma.role.create({
        data: { ...args, id },
      });

      return {
        role,
        success: true,
      };
    } catch (e) {
      return GraphqlHelper.createGenericErrorResult(e);
    }
  }

  @Mutation('deleteRole')
  async deleteRole(@Args('input') args) {
    try {
      console.log(args);
      await this.prisma.role.delete({ where: { id: args.id } });

      return {
        success: true,
      };
    } catch (e) {
      return GraphqlHelper.createGenericErrorResult(e);
    }
  }

  @Mutation('addRolesUser')
  async addRoleUser(@Args('input') args: AddRoleUserInput) {
    try {
      await this.prisma.user.update({
        data: {
          roles: { connect: args.roles.map((role) => ({ id: role.id })) },
        },
        where: {
          id: args.userId,
        },
      });

      return {
        success: true,
      };
    } catch (e) {
      return GraphqlHelper.createGenericErrorResult(e);
    }
  }
}
