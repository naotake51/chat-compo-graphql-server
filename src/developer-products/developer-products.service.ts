import { Injectable } from '@nestjs/common';
import { DeveloperProduct } from '@prisma/client';
import { PrismaService } from '@/prisma.service';

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
