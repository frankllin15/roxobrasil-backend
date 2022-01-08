import { Injectable } from '@nestjs/common';
import { Args } from '@nestjs/graphql';
import { NewProductInput } from 'src/graphql';
import { MathHelper } from 'src/helpers/math.helper';
import { PrismaService } from 'src/prisma.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ProductService {
  constructor(private readonly prismaServise: PrismaService) {}

  public async createProduct(input: NewProductInput): Promise<any> {
    const { variants, ...data } = input;

    const variantsPrice = variants.map((e) => e.price);

    const max = MathHelper.max(variantsPrice);
    const min = MathHelper.min(variantsPrice);

    const product = await this.prismaServise.product.create({
      data: {
        id: uuid(),
        ...data,
        price: { create: { max: max, min: min } },
        variants: {
          create: variants.map(({ assets, ...variantData }) => ({
            id: uuid(),
            ...variantData,
            assets: { create: assets },
          })),
        },
      },
      include: { price: true, variants: true },
    });

    return product;
  }

  async getProducts(
    @Args('input') input,
  ): Promise<{ products: any; total_items: number }> {
    const products = await this.prismaServise.product.findMany({
      take: input.take || 20,
    });

    const total_items = await this.prismaServise.product.count();

    return {
      total_items,
      products,
    };
  }

  async deleteAllProducts() {
    const { count } = await this.prismaServise.product.deleteMany({
      where: { id: { not: undefined } },
    });

    return count;
  }
}
