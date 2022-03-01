import { Injectable } from '@nestjs/common';
import { GetListInput, NewAssetsInput } from 'src/graphql';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AssetsService {
  constructor(private readonly prismaService: PrismaService) {}

  public async getAssets(input: GetListInput) {
    const items = await this.prismaService.assets.findMany({
      take: input.take,
    });

    return items;
  }

  public async createAssets(input: NewAssetsInput) {
    const item = await this.prismaService.assets.create({ data: input });

    return item;
  }
}
