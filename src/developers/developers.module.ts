import { Module } from '@nestjs/common';
import { DevelopersResolver } from '@/developers/developers.resolvers';
import { DevelopersService } from '@/developers/developers.service';
import { PrismaService } from '@/prisma.service';
import { DeveloperProductsModule } from '@/developer-products/developer-products.module';

@Module({
  providers: [DevelopersResolver, DevelopersService, PrismaService],
  imports: [DeveloperProductsModule],
})
export class DevelopersModule {}
