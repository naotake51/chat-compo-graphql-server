import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolvers';

@Module({
  providers: [UserResolver],
})
export class UsersModule {}
