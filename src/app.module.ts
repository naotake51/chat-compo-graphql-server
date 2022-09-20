import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { Context } from 'graphql-ws';
import * as Joi from 'joi';
import { AuthModule } from './auth/auth.module';
import { DevelopersModule } from '@/developers/developers.module';
import { TalkersModule } from '@/talkers/talkers.module';

const jwtService = new JwtService({ secret: process.env.JWT_SECRET });

function verifyAuthorizationHeader(authorization: any) {
  if (authorization === undefined)
    throw new Error('Authorization header undefined.');

  if (typeof authorization !== 'string')
    throw new Error('Authorization header type error.');

  const matcher = authorization.match(/^Bearer +(.*)$/);
  if (!matcher) throw new Error('Authorization header format error.');

  const authToken = matcher[1];

  return jwtService.verify(authToken);
}

@Module({
  imports: [
    ConfigModule.forRoot({
      /**
       * developとtestで.envを切り替えながら運用する。
       * NODE_ENVによって参照するファイルを切り替えようかと考えたがPrismaが.envを直接参照しているので諦めた。
       * Dockerコンテナを開発用とテスト用でそれぞれ用意するのも考慮したが、現状では.envを切り替えるのが一番楽と判断。
       */
      envFilePath: '.env',
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .required(),
        DATABASE_URL: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.string().required(),
      }),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: false,
      debug: process.env.NODE_ENV === 'development',
      playground: process.env.NODE_ENV === 'development',
      subscriptions: {
        'graphql-ws': {
          onConnect: (context: Context<any>) => {
            const { connectionParams, extra } = context;

            (extra as any).payload = verifyAuthorizationHeader(
              connectionParams.Authorization,
            );
          },
        },
        'subscriptions-transport-ws': {
          // FIXME
          // このパッケージでもまもなく廃止される予定なので、graphql-wsを使うことが推奨されている。
          // GraphQL Playgroundがsubscriptions-transport-wsで通信するようになっていて、graphql-wsへの切り替え方がわからなかったので開発用として残している。
          onConnect: (connectionParams) => {
            return {
              payload: verifyAuthorizationHeader(
                connectionParams.Authorization,
              ),
            };
          },
        },
      },
    }),
    DevelopersModule,
    TalkersModule,
    AuthModule,
  ],
})
export class AppModule {}
