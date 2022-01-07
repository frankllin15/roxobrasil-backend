import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { LoginResult, NewUserInput, VerifyInput } from 'src/graphql';
import { AuthService } from './auth.service';
import { GqlAuthGuard } from './guards/gql-auth.guard';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation('login')
  async login(@Args('input') input: any): Promise<LoginResult> {
    return this.authService.login(input);
  }

  @Mutation('createUser')
  async createUser(@Args('input') input: NewUserInput) {
    return this.authService.register(input);
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
