import { Args, Mutation, Resolver } from '@nestjs/graphql';
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

  @Mutation('updateVariants')
  async updateVariants(
    @Args('input') input: UpdateVariantsInput,
  ): Promise<VariantsResult> {
    try {
      const variants = await this.variantsService.updateVariats(input);

      return {
        success: true,
        variants,
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
