import { Module } from '@nestjs/common';
import { DeveloperProductsResolver } from '@/developer-products/developer-products.resolvers';
import { DeveloperProductsService } from '@/developer-products/developer-products.service';
import { PrismaService } from '@/prisma.service';
import { ProductsModule } from '@/products/products.module';

@Module({
  providers: [
    DeveloperProductsService,
    PrismaService,
    DeveloperProductsResolver,
  ],
  exports: [DeveloperProductsService],
  imports: [ProductsModule],
})
export class DeveloperProductsModule {}
