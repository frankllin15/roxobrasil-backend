import { Injectable } from '@nestjs/common';
import {
  Collection,
  GetListInput,
  IdInput,
  NewCollectionInput,
} from 'src/graphql';
import { PrismaService } from 'src/prisma.service';

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

  async getCollection(input: IdInput): Promise<Collection> {
    return await this.prismaService.collection.findUnique({
      where: { id: input.id },
      include: { products: true },
    });
  }

  async deleCollection(input: IdInput) {
    await this.prismaService.collection.delete({
      where: { id: input.id },
    });
  }
}
