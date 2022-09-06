import { Module } from '@nestjs/common';
import { DeveloperProductsModule } from '@/developer-products/developer-products.module';
import { DevelopersResolver } from '@/developers/developers.resolvers';
import { DevelopersService } from '@/developers/developers.service';
import { PrismaService } from '@/prisma.service';

@Module({
  providers: [DevelopersResolver, DevelopersService, PrismaService],
  imports: [DeveloperProductsModule],
  exports: [DevelopersService],
})
export class DevelopersModule {}
