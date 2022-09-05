import { Module } from '@nestjs/common';
import { PrismaService } from '@/prisma.service';
import { DeveloperProductsService } from '@/developer-products/developer-products.service';
import { DeveloperProductsResolver } from '@/developer-products/developer-products.resolvers';
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
