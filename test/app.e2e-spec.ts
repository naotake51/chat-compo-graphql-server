import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '@/app.module';

describe('e2e test', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  async function login(email: string, password: string): Promise<string> {
    const res = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
          mutation {
            login(
              loginInput: {
                email: "${email}",
                password: "${password}"
              }
            ) {
              accessToken
            }
          }
        `,
      });

    return res.body.data.login.accessToken;
  }

  describe('developer', () => {
    it('get developer', async () => {
      const id = 'b528ae75-2024-44f6-afdf-2e4daaaf5e28';
      const email = 'test@example.com';
      const password = 'password1234';

      const accessToken = await login(email, password);

      const res = await request(app.getHttpServer())
        .post('/graphql')
        .auth(accessToken, { type: 'bearer' })
        .send({
          query: `
            query {
              developer(id: "${id}") {
                id
                email
              }
            }
          `,
        });

      expect(res.body.data.developer).toEqual({ id, email });
    });
  });
});
