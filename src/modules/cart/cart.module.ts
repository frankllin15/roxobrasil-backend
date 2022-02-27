import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CartResolver } from './cart.resolver';
import { CartService } from './cart.service';

@Module({
  providers: [CartResolver, CartService, PrismaService],
  exports: [CartService],
})
export class CartModule {}
