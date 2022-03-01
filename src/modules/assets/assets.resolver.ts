import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  AssetsResult,
  GetListInput,
  ListAssetsResult,
  NewAssetsInput,
} from 'src/graphql';
import { GraphqlHelper } from 'src/helpers/graphql.helper';
import { AssetsService } from './assets.service';

@Resolver()
export class AssetsResolver {
  constructor(private readonly assetsService: AssetsService) {}
  @Query('assets')
  public async getAssets(
    @Args('input') input: GetListInput,
  ): Promise<ListAssetsResult> {
    try {
      const items = await this.assetsService.getAssets(input);

      return {
        success: true,
        items,
      };
    } catch (e) {
      return GraphqlHelper.createGenericErrorResult(e);
    }
  }

  @Mutation('createAssets')
  public async createAssets(
    @Args('input') input: NewAssetsInput,
  ): Promise<AssetsResult> {
    try {
      const item = await this.assetsService.createAssets(input);

      return {
        success: true,
        item,
      };
    } catch (e) {
      return GraphqlHelper.createGenericErrorResult(e);
    }
  }
}
