import { Module } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { AssetsResolver } from './assets.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [AssetsService, AssetsResolver, PrismaService],
  exports: [AssetsService],
})
export class AssetsModule {}
