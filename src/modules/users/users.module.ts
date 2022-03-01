import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { RolesService } from 'src/modules/roles/roles.service';
import { UserResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  controllers: [],
  imports: [],
  providers: [PrismaService, UserResolver, UsersService, RolesService],
  exports: [UsersService],
})
export class UsersModule {}
