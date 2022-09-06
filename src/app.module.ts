import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';
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
      installSubscriptionHandlers: true, // FIXME: 最新バージョンの Apollo サーバーから削除されており、このパッケージでもまもなく廃止される予定
    }),
    DevelopersModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
