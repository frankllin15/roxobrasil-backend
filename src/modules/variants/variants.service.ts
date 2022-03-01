import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { IdListInput, NewVariantInput, UpdateVariantsInput } from 'src/graphql';
import { PrismaService } from 'src/prisma.service';
import { ProductService } from 'src/modules/product/product.service';

@Injectable()
export class VariantsService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => ProductService))
    private readonly productService: ProductService,
  ) {}

  async createVariant(input: NewVariantInput) {
    const { assets, ...data } = input;

    return await this.prismaService.variant.create({
      data: {
        ...data,
        assets: { connect: assets },
      },
      // select: { id: true },
    });
  }

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
