import { Module } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { CollectionsResolver } from './collections.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [CollectionsService, CollectionsResolver, PrismaService],
})
export class CollectionsModule {}
