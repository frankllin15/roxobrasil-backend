import { Injectable } from '@nestjs/common';
import { Role } from 'src/graphql';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class RolesService {
  constructor(private readonly usersService: UsersService) {}
  public async getUserRole(email: string): Promise<Array<Role>> {
    const roles = await this.usersService.getUserRolesByEmail(email);

    return roles;
  }
}
