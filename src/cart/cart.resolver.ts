import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CartResult,
  CartsResult,
  DefaultResult,
  IdInput,
  NewCart,
  UpdateCartInput,
} from 'src/graphql';
import { GraphqlHelper } from 'src/helpers/graphql.helper';
import { CartService } from './cart.service';

@Resolver('Cart')
export class CartResolver {
  constructor(private readonly carService: CartService) {}

  @Query('cart')
  async cart(@Args('input') input: IdInput): Promise<CartResult> {
    try {
      const cart = await this.carService.getCart(input);

      return {
        success: true,
        cart,
      };
    } catch (e) {
      return GraphqlHelper.createGenericErrorResult(e);
    }
  }
  @Query('carts')
  async carts(): Promise<CartsResult> {
    try {
      const carts = await this.carService.getCarts();

      return {
        success: true,
        carts,
      };
    } catch (e) {
      return GraphqlHelper.createGenericErrorResult(e);
    }
  }

  @Mutation('createCart')
  async createCart(@Args('input') input: NewCart): Promise<CartResult> {
    try {
      const cart = await this.carService.createCart(input);

      return {
        success: true,
        cart,
      };
    } catch (e) {
      return GraphqlHelper.createGenericErrorResult(e);
    }
  }

  @Mutation('updateCart')
  async updateCart(@Args('input') input: UpdateCartInput): Promise<CartResult> {
    try {
      const cart = await this.carService.updateCart(input);

      return {
        success: true,
        cart,
      };
    } catch (e) {
      return GraphqlHelper.createGenericErrorResult(e);
    }
  }

  @Mutation('deleteCart')
  async deleteCart(
    @Args('input') input: UpdateCartInput,
  ): Promise<DefaultResult> {
    try {
      await this.carService.deleteCart(input);

      return {
        success: true,
      };
    } catch (e) {
      return GraphqlHelper.createGenericErrorResult(e);
    }
  }
}
