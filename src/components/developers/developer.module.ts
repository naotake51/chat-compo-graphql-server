import { Module } from '@nestjs/common';
import { DeveloperResolver } from './developer.resolvers';

@Module({
  providers: [DeveloperResolver],
})
export class DevelopersModule {}
