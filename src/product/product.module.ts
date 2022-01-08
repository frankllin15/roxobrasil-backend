import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [ProductService, ProductResolver, PrismaService],
})
export class ProductModule {}
