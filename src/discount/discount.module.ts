import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { DiscountResolver } from './discount.resolver';
import { DiscountService } from './discount.service';

@Module({
  providers: [DiscountResolver, DiscountService, PrismaService],
})
export class DiscountModule {}
