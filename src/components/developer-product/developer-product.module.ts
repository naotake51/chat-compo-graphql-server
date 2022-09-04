import { Module } from '@nestjs/common';
import { DeveloperProductService } from './developer-product.service';
import { PrismaService } from '@/prisma.service';
import { DeveloperProductResolver } from './developer-product.resolvers';
import { ProductModule } from '../products/product.module';

@Module({
  providers: [DeveloperProductService, PrismaService, DeveloperProductResolver],
  exports: [DeveloperProductService],
  imports: [ProductModule],
})
export class DeveloperProductModule {}
