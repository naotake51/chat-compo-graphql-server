import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma.service';
import { DeveloperProduct } from '@prisma/client';

@Injectable()
export class DeveloperProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async findManyByDeveloperId(
    developerId: string,
  ): Promise<DeveloperProduct[]> {
    const developerProducts = await this.prisma.developerProduct.findMany({
      where: { developerId },
    });

    return developerProducts;
  }
}
