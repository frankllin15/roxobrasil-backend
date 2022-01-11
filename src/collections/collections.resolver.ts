import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CollectionResult,
  CollectionsResult,
  DefaultResult,
  DeleteInput,
  GetListInput,
  NewCollectionInput,
} from 'src/graphql';
import { GraphqlHelper } from 'src/helpers/graphql.helper';
import { CollectionsService } from './collections.service';

@Resolver()
export class CollectionsResolver {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Query('collections')
  async collections(
    @Args('input') input: GetListInput,
  ): Promise<CollectionsResult> {
    try {
      const collections = await this.collectionsService.getCollections(input);

      return {
        success: true,
        collections,
      };
    } catch (e) {
      return GraphqlHelper.createGenericErrorResult(e);
    }
  }

  @Mutation('createCollection')
  async createCollection(
    @Args('input') input: NewCollectionInput,
  ): Promise<CollectionResult> {
    try {
      const collection = await this.collectionsService.createCollection(input);

      return {
        success: true,
        collection,
      };
    } catch (e) {
      return GraphqlHelper.createGenericErrorResult(e);
    }
  }

  @Mutation('deleteCollection')
  async deleteCollection(
    @Args('input') input: DeleteInput,
  ): Promise<DefaultResult> {
    try {
      await this.collectionsService.deleCollection(input);

      return {
        success: true,
      };
    } catch (e) {
      return GraphqlHelper.createGenericErrorResult(e);
    }
  }
}
