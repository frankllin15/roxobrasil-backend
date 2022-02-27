import { Injectable } from '@nestjs/common';
import { IdListInput, UpdateVariantsInput } from 'src/graphql';
import { PrismaService } from 'src/prisma.service';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class VariantsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly productService: ProductService,
  ) {}

  async getVariants(input: IdListInput) {
    return await this.prismaService.variant.findMany({
      where: { id: { in: input.ids } },
    });
  }

  async updateVariats(input: UpdateVariantsInput) {
    const variants = await Promise.all(
      input.variants.map(async (variant) => {
        const { assets, ...variantData } = variant;

        return await this.prismaService.variant.update({
          where: { id: variant.id },
          data: {
            ...variantData,
            assets: {
              create: assets,
            },
          },
        });
      }),
    );

    if (input.variants.some((variant) => variant.price)) {
      this.productService.updatePriceRange(input.product_id);
    }
    return variants;
  }

  async deleteVariants(input: IdListInput) {
    console.log(input);
    return await this.prismaService.variant.deleteMany({
      where: {
        id: {
          in: input.ids || [],
        },
      },
    });
  }
}
