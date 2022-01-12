import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  ProductDiscountInput,
  DiscountResult,
  GetListInput,
  IdInput,
  NewDiscountInput,
} from 'src/graphql';
import { GraphqlHelper } from 'src/helpers/graphql.helper';
import { DiscountService } from './discount.service';

@Resolver()
export class DiscountResolver {
  constructor(private readonly discountService: DiscountService) {}

  @Query('discount')
  async discount(@Args('input') input: IdInput): Promise<any> {
    try {
      const discount = await this.discountService.getDiscount(input);

      return {
        success: true,
        discount,
      };
    } catch (e) {
      return GraphqlHelper.createGenericErrorResult(e);
    }
  }
  @Query('discounts')
  async discounts(@Args('input') input: GetListInput): Promise<any> {
    try {
      const discounts = await this.discountService.getDiscounts(input);

      return {
        success: true,
        discounts,
      };
    } catch (e) {
      return GraphqlHelper.createGenericErrorResult(e);
    }
  }

  @Mutation('createDiscount')
  async createDiscount(
    @Args('input') input: NewDiscountInput,
  ): Promise<DiscountResult> {
    try {
      const discount = await this.discountService.createDiscount(input);

      return {
        success: true,
        discount,
      };
    } catch (e) {
      return GraphqlHelper.createGenericErrorResult(e);
    }
  }

  @Mutation('addProductsDiscount')
  async addProductsDiscount(
    @Args('input') input: ProductDiscountInput,
  ): Promise<any> {
    try {
      const discount = this.discountService.addProductsDiscount(input);

      return {
        success: true,
        discount,
      };
    } catch (e) {
      return GraphqlHelper.createGenericErrorResult(e);
    }
  }

  @Mutation('removeProductsDiscount')
  async removeProductsDiscount(
    @Args('input') input: ProductDiscountInput,
  ): Promise<any> {
    try {
      const discount = this.discountService.removeProductsDiscount(input);

      return {
        success: true,
        discount,
      };
    } catch (e) {
      return GraphqlHelper.createGenericErrorResult(e);
    }
  }
}
