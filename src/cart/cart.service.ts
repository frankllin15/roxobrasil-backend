import { Injectable } from '@nestjs/common';
import { Cart, IdInput, NewCart, UpdateCartInput } from 'src/graphql';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  public async createCart(input: NewCart): Promise<Cart> {
    const { user_id, products } = input;
    return await this.prisma.cart.create({
      data: {
        user_id,
        products: { connect: products },
      },
    });
  }

  public async getCart(input: IdInput): Promise<Cart> {
    return this.prisma.cart.findUnique({ where: { id: input.id } });
  }
  public async getCarts(): Promise<Array<any>> {
    return this.prisma.cart.findMany({ include: { products: true } });
  }

  public async updateCart(input: UpdateCartInput): Promise<Cart> {
    return await this.prisma.cart.update({
      where: { id: input.id },
      data: {},
    });
  }
  // Lembrar de atualizar prisma: Cart.produscts não pode ser uma Varialte, por conta da quantidade

  public async deleteCart(input: IdInput): Promise<void> {
    await this.prisma.cart.delete({ where: { id: input.id } });
  }
}
