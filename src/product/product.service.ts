import { Injectable } from '@nestjs/common';
import { Args } from '@nestjs/graphql';
import {
  IdInput,
  GetProductBySlugInput,
  NewProductInput,
  UpdateProductInput,
} from 'src/graphql';
import { MathHelper } from 'src/helpers/math.helper';
import { StringFormatHelper } from 'src/helpers/stringFormat.helper';
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
    const id = uuid();

    const slug = StringFormatHelper.createSlug(input.name, id);

    const item = await this.prismaServise.product.create({
      data: {
        id,
        slug,
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

    return item;
  }

  async getProducts(
    @Args('input') input,
  ): Promise<{ items: any; total_items: number }> {
    const items = await this.prismaServise.product.findMany({
      take: input?.take || 20,
      include: {
        variants: { include: { assets: true } },
        price: true,
        collections: true,
        discount: true,
      },
    });

    const total_items = await this.prismaServise.product.count();

    return {
      total_items,
      items,
    };
  }

  async getProductBySlug(input: GetProductBySlugInput): Promise<any> {
    return await this.prismaServise.product.findUnique({
      where: { slug: input.slug },
      include: { price: true, variants: { include: { assets: true } } },
    });
  }

  async updateProduct(input: UpdateProductInput): Promise<any> {
    const { variants, collections, ...data } = input.data;

    const product = this.prismaServise.product.update({
      where: { id: input.id },
      data: {
        collections: { connect: collections },
        ...data,
        variants: {
          create: variants.map(({ assets, ...variatsData }) => ({
            id: uuid(),
            ...variatsData,
            assets: { create: assets },
          })),
        },
      },
      include: { price: true, variants: true, collections: true },
    });

    this.updatePriceRange((await product).id);

    return product;
  }
  async deleteProduct(input: IdInput) {
    await this.prismaServise.product.delete({ where: { id: input.id } });
  }

  async deleteAllProducts() {
    const { count } = await this.prismaServise.product.deleteMany({
      where: { id: { not: undefined } },
    });

    return count;
  }

  async updatePriceRange(id: string) {
    const product = await this.prismaServise.product.findUnique({
      where: { id: id },
      select: { price: true, variants: { select: { price: true } } },
    });

    const variantsPrice = product.variants.map((variant) => variant.price);

    await this.prismaServise.product.update({
      where: { id: id },
      data: {
        price: {
          update: {
            min: MathHelper.min(variantsPrice),
            max: MathHelper.max(variantsPrice),
          },
        },
      },
    });
  }
}
