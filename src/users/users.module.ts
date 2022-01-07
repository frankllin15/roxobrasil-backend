import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  controllers: [],
  providers: [PrismaService, UserResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
