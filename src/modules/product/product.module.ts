import { forwardRef, Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { PrismaService } from 'src/prisma.service';
import { VariantsModule } from '../variants/variants.module';
import { VariantsService } from '../variants/variants.service';

@Module({
  providers: [ProductService, ProductResolver, PrismaService, VariantsService],
  exports: [ProductService],
  imports: [forwardRef(() => VariantsModule)],
})
export class ProductModule {}
