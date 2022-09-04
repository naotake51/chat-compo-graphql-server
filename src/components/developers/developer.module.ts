import { Module } from '@nestjs/common';
import { DeveloperResolver } from './developer.resolvers';
import { DeveloperService } from './developer.service';
import { PrismaService } from '@/prisma.service';
import { DeveloperProductModule } from '@/components/developer-product/developer-product.module';

@Module({
  providers: [DeveloperResolver, DeveloperService, PrismaService],
  imports: [DeveloperProductModule],
})
export class DeveloperModule {}
