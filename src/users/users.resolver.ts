import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { UsersService } from './users.service';
import {
  DeleteUserInput,
  UserInput,
  UserResult,
  UpdateUserInput,
} from 'src/graphql';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { RolesEnum } from 'src/roles/roles.enum';
import { GraphqlHelper } from 'src/helpers/graphql.helper';

@UseGuards(RolesGuard)
@UseGuards(GqlAuthGuard)
@Resolver('User')
export class UserResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query('user')
  async user(@Args('input') input: UserInput): Promise<UserResult> {
    try {
      const user = await this.usersService.getUserById(input.id);

      if (!user) throw new Error('User does not exists');
      return {
        success: true,
        user,
      };
    } catch (e) {
      return GraphqlHelper.createGenericErrorResult(e);
    }
  }

  @Query('users')
  @Roles(RolesEnum.ADMIN)
  async users() {
    return this.usersService.getUsers();
  }

  @Mutation('updateUser')
  async updateUser(@Args('input') input: UpdateUserInput): Promise<UserResult> {
    try {
      const user = await this.usersService.updateUser(input);

      return {
        success: true,
        user,
      };
    } catch (e) {
      return GraphqlHelper.createGenericErrorResult(e);
    }
  }

  @Mutation('deleteUser')
  @Roles(RolesEnum.ADMIN)
  async deleteUser(@Args('input') input: DeleteUserInput) {
    return this.usersService.deleteUser(input);
  }
}
