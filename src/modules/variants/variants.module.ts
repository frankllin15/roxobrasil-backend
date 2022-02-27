import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProductModule } from 'src/product/product.module';
import { VariantsResolver } from './variants.resolver';
import { VariantsService } from './variants.service';

@Module({
  providers: [VariantsResolver, VariantsService, PrismaService],
  imports: [ProductModule],
})
export class VariantsModule {}
