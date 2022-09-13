import { Module } from '@nestjs/common';
import { TalkersResolver } from '@/talkers/talkers.resolvers';

@Module({
  providers: [TalkersResolver],
})
export class TalkersModule {}
