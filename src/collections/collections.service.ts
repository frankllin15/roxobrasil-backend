import { Injectable } from '@nestjs/common';
import {
  Collection,
  DeleteInput,
  GetListInput,
  NewCollectionInput,
} from 'src/graphql';
import { PrismaService } from 'src/prisma.service';
import { dateNow } from 'src/helpers/moment.helper';

@Injectable()
export class CollectionsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createCollection(input: NewCollectionInput): Promise<Collection> {
    const { children, parent, ...data } = input;
    return await this.prismaService.collection.create({
      data: {
        ...data,
        children: { connect: children || [] },
        parent: { connect: parent || [] },
        created_at: dateNow(),
      },
    });
  }

  async getCollections(input: GetListInput): Promise<Array<Collection>> {
    return this.prismaService.collection.findMany({
      take: input.take || 20,
      include: {
        products: { include: { price: true, variants: true } },
        children: true,
        parent: true,
      },
    });
  }

  async deleCollection(input: DeleteInput) {
    await this.prismaService.collection.delete({
      where: { id: input.id },
    });
  }
}
