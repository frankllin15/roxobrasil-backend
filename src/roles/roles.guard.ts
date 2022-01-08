import { CanActivate, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { RolesService } from './roles.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly rolesService: RolesService,
  ) {}
  async canActivate(context: GqlExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const {
      req: { user },
    } = ctx.getContext();

    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) return true;

    const userRoles = await this.rolesService.getUserRole(user.email);

    const isUserAuthorized = roles.reduce((prev, value) => {
      const equal = userRoles.some((role) => role.name == value);

      return equal || prev;
    }, false);

    return isUserAuthorized;
  }
}
