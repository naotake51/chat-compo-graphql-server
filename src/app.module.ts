import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { DevelopersModule } from '@/developers/developers.module';
import { UsersModule } from '@/users/users.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: false,
      // debug: false,
      // playground: false,
    }),
    DevelopersModule,
    UsersModule,
  ],
})
export class AppModule {}
