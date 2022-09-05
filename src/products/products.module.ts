import { Module } from '@nestjs/common';
import { PrismaService } from '@/prisma.service';
import { ProductsService } from '@/products/products.service';

@Module({
  providers: [ProductsService, PrismaService],
  exports: [ProductsService],
})
export class ProductsModule {}
