import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UpdateVariantsInput, VariantsResult } from 'src/graphql';
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
}
