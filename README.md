<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

## Query sample

**GraphQL Playground**
http://localhost:3000/graphql

HTTP HEADERS
```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJzdWIiOiI4Njc0MmNkNy02MDhhLWYzNzItZTRlNy1lZjBhMmVhMjNmYzciLCJpYXQiOjE2NjI0NDg0MjQsImV4cCI6MTY2MjQ1MjAyNH0.m0nLK9XGuXArn-v3vsbCXPXzgr3QnL5cUkZMTu9Gn3M"  
}
```

### Login Developer

```graphql
mutation {
  login(
    loginInput: {
      email: "test@example.com", 
      password: "password12345"
    }
  ) {
    developer {
    	email
      joinedProducts {
        productId
  	  	product {
          id
        }
      }
    },
    accessToken
  }
}
```

### Show Developer

```graphql
query {
  developer(id: "86742cd7-608a-f372-e4e7-ef0a2ea23fc7") {
    id
    email
    joinedProducts {
      productId
  		product {
        id
      }
    }
  }
  talker(id: "1") {
    id
    name
    joinedRooms {
      joinedMessageOrder
      readMessageOrder
      room {
       id
       name
       joinedTalkers {
         joinedMessageOrder
         readMessageOrder
      	 talker {
          id
         }
       }
     }
    }
  }
}
```

### Create Developer

```graphql
mutation {
  createDeveloper(
    data: {
      email: "test@example.com"
      password: "password1234"
    }
  ) {
    email
  }
}
```

### Update Developer


```graphql
mutation {
  updateDeveloper(
    data: {
      id: "86742cd7-608a-f372-e4e7-ef0a2ea23fc7", 
      email: "test2@example.com"
    }
  ) {
    email
  }
}
```

### Subscribe Developer Update

```graphql
subscription {
  developerUpdated(id: "86742cd7-608a-f372-e4e7-ef0a2ea23fc7") {
    id
    email
  }
}
```

## DataBase

```
npx prisma studio
```

http://localhost:5555


## Seeder

```
npx prisma db seed
```

## Environment

Properties defined in .env are merged into environment variables.

**.env**
```txt
NODE_ENV="development"
```

Once you have defined the new environment variables, add the code to the following file.

**src/global.d.ts**
```ts
declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
  }
}
```

**src/app.module.ts**
```ts
@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .required(),
      }),
    }),
```

### Create Test DB & Migration

```bash
docker-compose exec postgres psql -U root -d chat-compo -c "CREATE DATABASE \"chat-compo-test\""
```

Prism references `.env`, so copy `.env.test` to `.env` and run the command.
```bash
npx prisma migrate deploy
```
