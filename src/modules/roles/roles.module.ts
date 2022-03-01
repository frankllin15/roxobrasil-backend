import { Module } from '@nestjs/common';
import { AuthModule } from 'src/modules/auth/auth.module';
import { PrismaService } from 'src/prisma.service';
import { UsersModule } from 'src/modules/users/users.module';
import { RolesResolver } from './roles.resolver';
import { RolesService } from './roles.service';

@Module({
  providers: [RolesResolver, RolesService, PrismaService],
  imports: [UsersModule, AuthModule],
  exports: [RolesService],
})
export class RolesModule {}
