import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import {
  CreateUserResult,
  LoginResult,
  NewUserInput,
  VerifyInput,
} from 'src/graphql';
import { GraphqlHelper } from 'src/helpers/graphql.helper';
import { AuthService } from './auth.service';
import { GqlAuthGuard } from './guards/gql-auth.guard';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation('login')
  async login(@Args('input') input: any): Promise<LoginResult> {
    try {
      const payload = await this.authService.login(input);
      return {
        ...payload,
        success: true,
      };
    } catch (e) {
      return GraphqlHelper.createGenericErrorResult(e);
    }
  }

  @Mutation('createUser')
  async createUser(
    @Args('input') input: NewUserInput,
  ): Promise<CreateUserResult> {
    try {
      const payload = await this.authService.register(input);

      return {
        success: true,
        ...payload,
      };
    } catch (e) {
      return GraphqlHelper.createGenericErrorResult(e);
    }
  }

  @UseGuards(GqlAuthGuard)
  @Mutation('verify')
  async verify(
    @Args('input') args: VerifyInput,
    @Context() ctx: any,
  ): Promise<any> {
    return ctx.req.user;
  }
}
