import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import {
  DefaultResult,
  IdInput,
  GetListInput,
  GetProductBySlugInput,
  NewProductInput,
  ProductResult,
  ProductsResult,
  UpdateProductInput,
} from 'src/graphql';
import { GraphqlHelper } from 'src/helpers/graphql.helper';
import { ProductService } from './product.service';

@Resolver()
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query('products')
  public async products(
    @Args('input') input: GetListInput,
  ): Promise<ProductsResult> {
    try {
      const { items, total_items } = await this.productService.getProducts(
        input,
      );

      return {
        success: true,
        items,
        total_items,
      };
    } catch (e) {
      return GraphqlHelper.createGenericErrorResult(e);
    }
  }

  @Query('getProductBySlug')
  public async getProductsBySlug(
    @Args('input') input: GetProductBySlugInput,
  ): Promise<any> {
    try {
      const item = await this.productService.getProductBySlug(input);

      return {
        success: true,
        item,
      };
    } catch (e) {
      return GraphqlHelper.createGenericErrorResult(e);
    }
  }

  // @UseGuards(GqlAuthGuard)
  // @Mutation('deleteAllProducts')
  // async delete() {
  //   const count = await this.productService.deleteAllProducts();

  //   return {
  //     count,
  //   };
  // }

  @UseGuards(GqlAuthGuard)
  @Mutation('createProduct')
  async createProduct(
    @Args('input') input: NewProductInput,
  ): Promise<ProductResult> {
    try {
      const item = await this.productService.createProduct(input);

      return {
        success: true,
        item,
      };
    } catch (e) {
      return GraphqlHelper.createGenericErrorResult(e);
    }
  }

  @UseGuards(GqlAuthGuard)
  @Mutation('deleteProduct')
  async deleteProduct(@Args('input') input: IdInput): Promise<DefaultResult> {
    try {
      await this.productService.deleteProduct(input);
      return {
        success: true,
      };
    } catch (e) {
      return GraphqlHelper.createGenericErrorResult(e);
    }
  }

  @UseGuards(GqlAuthGuard)
  @Mutation('updateProduct')
  async updateProduct(
    @Args('input') input: UpdateProductInput,
  ): Promise<ProductResult> {
    try {
      const product = await this.productService.updateProduct(input);

      return {
        success: true,
        item: product,
      };
    } catch (e) {
      return GraphqlHelper.createGenericErrorResult(e);
    }
  }
}
