import { Module } from '@nestjs/common';
import { DeveloperResolver } from './developer.resolvers';
import { DeveloperService } from './developer.service';
import { PrismaService } from '@/prisma.service';

@Module({
  providers: [DeveloperResolver, DeveloperService, PrismaService],
})
export class DevelopersModule {}
