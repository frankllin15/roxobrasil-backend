import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { UsersService } from './users.service';
import { DeleteUserInput } from 'src/graphql';

@Resolver('User')
export class UserResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query('users')
  @UseGuards(GqlAuthGuard)
  async users() {
    return this.usersService.getUsers();
  }

  @Mutation('deleteUser')
  @UseGuards(GqlAuthGuard)
  async deleteUser(@Args('input') input: DeleteUserInput) {
    return this.usersService.deleteUser(input);
  }
}
