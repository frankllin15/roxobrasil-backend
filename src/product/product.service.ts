import { Injectable } from '@nestjs/common';
import { Args } from '@nestjs/graphql';
import {
  DeleteInput,
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

    const product = await this.prismaServise.product.create({
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

    return product;
  }

  async getProducts(
    @Args('input') input,
  ): Promise<{ products: any; total_items: number }> {
    const products = await this.prismaServise.product.findMany({
      take: input.take || 20,
      include: {
        variants: { include: { assets: true } },
        price: true,
        collections: true,
      },
    });

    const total_items = await this.prismaServise.product.count();

    return {
      total_items,
      products,
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
    const price = { max: undefined, min: undefined };

    if (variants?.length > 0) {
      const prevVariatsPrice = await this.prismaServise.variant.findMany({
        where: { product_id: input.id },
        select: { price: true },
      });

      const variatsPrice = prevVariatsPrice
        .concat(variants.map(({ price }) => ({ price })))
        .map(({ price }) => price);

      price.max = MathHelper.max(variatsPrice);
      price.min = MathHelper.min(variatsPrice);
    }

    const priceAndVariats =
      variants?.length > 0
        ? {
            price: { update: { min: price.min, max: price.max } },
            variants: {
              create: variants.map(({ assets, ...variatsData }) => ({
                id: uuid(),
                ...variatsData,
                assets: { create: assets },
              })),
            },
          }
        : {};

    return await this.prismaServise.product.update({
      where: { id: input.id },
      data: {
        collections: { connect: collections },
        ...data,
        ...priceAndVariats,
      },
      include: { price: true, variants: true, collections: true },
    });
  }
  async deleteProduct(input: DeleteInput) {
    await this.prismaServise.product.delete({ where: { id: input.id } });
  }

  async deleteAllProducts() {
    const { count } = await this.prismaServise.product.deleteMany({
      where: { id: { not: undefined } },
    });

    return count;
  }

  async updatePriceRange(id: string) {
    console.log('Chamou o metodo');
    const product = await this.prismaServise.product.findUnique({
      where: { id: id },
      select: { price: true, variants: { select: { price: true } } },
    });

    const variantsPrice = product.variants.map((variant) => variant.price);

    const priceRage = {
      min: MathHelper.min(variantsPrice),
      max: MathHelper.max(variantsPrice),
    };

    return await this.prismaServise.product.update({
      where: { id: id },
      data: {
        price: { update: priceRage },
      },
    });
  }
}
