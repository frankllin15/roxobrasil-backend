import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import {
  NewProductInput,
  ProductResult,
  ProductsInput,
  ProductsResult,
} from 'src/graphql';
import { GraphqlHelper } from 'src/helpers/graphql.helper';
import { ProductService } from './product.service';

@Resolver()
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query('products')
  public async products(
    @Args('input') input: ProductsInput,
  ): Promise<ProductsResult> {
    try {
      const { products, total_items } = await this.productService.getProducts(
        input,
      );

      return {
        success: true,
        products,
        total_items,
      };
    } catch (e) {
      return GraphqlHelper.createGenericErrorResult(e);
    }
  }

  @Mutation('deleteAllProducts')
  async delete() {
    const count = await this.productService.deleteAllProducts();

    return {
      count,
    };
  }

  @Mutation('createProduct')
  async createProduct(
    @Args('input') input: NewProductInput,
  ): Promise<ProductResult> {
    try {
      const product = await this.productService.createProduct(input);

      return {
        success: true,
        product,
      };
    } catch (e) {
      return GraphqlHelper.createGenericErrorResult(e);
    }
  }
}
