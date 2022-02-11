import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  DeleteResult,
  IdListInput,
  UpdateVariantsInput,
  VariantsResult,
} from 'src/graphql';
import { GraphqlHelper } from 'src/helpers/graphql.helper';
import { VariantsService } from './variants.service';

@Resolver()
export class VariantsResolver {
  constructor(private readonly variantsService: VariantsService) {}

  @Query('variants')
  async getVariants(
    @Args('input') input: IdListInput,
  ): Promise<VariantsResult> {
    try {
      const items = await this.variantsService.getVariants(input);

      return {
        success: true,
        items,
      };
    } catch (e) {
      return GraphqlHelper.createGenericErrorResult(e);
    }
  }

  @Mutation('updateVariants')
  async updateVariants(
    @Args('input') input: UpdateVariantsInput,
  ): Promise<VariantsResult> {
    try {
      const items = await this.variantsService.updateVariats(input);

      return {
        success: true,
        items,
      };
    } catch (e) {
      return GraphqlHelper.createGenericErrorResult(e);
    }
  }

  @Mutation('deleteVariants')
  async deleteVariant(
    @Args('input') input: IdListInput,
  ): Promise<DeleteResult> {
    try {
      const { count } = await this.variantsService.deleteVariants(input);

      return {
        success: true,
        count,
      };
    } catch (e) {
      return GraphqlHelper.createGenericErrorResult(e);
    }
  }
}
