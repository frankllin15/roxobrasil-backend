import { forwardRef, Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProductModule } from 'src/modules/product/product.module';
import { VariantsResolver } from './variants.resolver';
import { VariantsService } from './variants.service';

@Module({
  providers: [VariantsResolver, VariantsService, PrismaService],
  exports: [VariantsService],
  imports: [forwardRef(() => ProductModule)],
})
export class VariantsModule {}
