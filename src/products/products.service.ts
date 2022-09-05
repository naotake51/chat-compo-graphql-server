import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma.service';
import { Product } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({ where: { id } });

    return product;
  }
}
