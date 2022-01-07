import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma.service';
import { UsersModule } from 'src/users/users.module';
import { RolesResolver } from './roles.resolver';
import { RolesService } from './roles.service';

@Module({
  providers: [RolesResolver, RolesService, PrismaService],
  imports: [UsersModule, AuthModule],
  exports: [RolesService],
})
export class RolesModule {}
