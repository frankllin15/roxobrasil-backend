import { Injectable } from '@nestjs/common';
import { ProductDiscountInput, GetListInput, IdInput } from 'src/graphql';
import { Discount } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { dateNow } from 'src/helpers/moment.helper';

@Injectable()
export class DiscountService {
  constructor(private readonly prismaService: PrismaService) {}

  async createDiscount(input: any): Promise<any> {
    return await this.prismaService.discount.create({
      data: {
        created_at: dateNow(),
        ...input,
      },
    });
  }

  async getDiscount(input: IdInput): Promise<Discount> {
    const discount = await this.prismaService.discount.findUnique({
      where: { id: input.id },
    });

    return discount;
  }

  async getDiscounts(input: GetListInput): Promise<Array<Discount>> {
    const discounts = await this.prismaService.discount.findMany({
      take: input.take,
      include: { products: true },
    });

    return discounts;
  }
  async addProductsDiscount(input: ProductDiscountInput): Promise<any> {
    return await this.prismaService.discount.update({
      where: { id: input.discount_id },
      data: { products: { connect: input.products } },
      include: { products: true },
    });
  }
  async removeProductsDiscount(input: ProductDiscountInput): Promise<any> {
    return await this.prismaService.discount.update({
      where: { id: input.discount_id },
      data: { products: { disconnect: input.products } },
      include: { products: true },
    });
  }
}
