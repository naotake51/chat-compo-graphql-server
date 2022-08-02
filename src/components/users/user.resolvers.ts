import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserModel } from './models/user.model';

@Resolver((of) => UserModel)
export class UserResolver {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  @Query(() => UserModel, { name: 'signedUser', nullable: true })
  async getSignedUser() {
    return {
      id: '40061f88-f6ac-d2fc-167b-c5a860f79f54',
      name: 'hoge',
      joinedRooms: [
        {
          id: 'aaf7212c-1bba-db35-848a-366c57d543d1',
          name: 'hoge',
          secretKey: '80ee6d5e-52d3-e801-a37d-25bdaea6b580',
          joinedUsers: [
            {
              id: 'aaf7212c-1bba-db35-848a-366c57d543d1',
              name: 'hoge',
              secretKey: '80ee6d5e-52d3-e801-a37d-25bdaea6b580',
            },
          ],
        },
        {
          id: '7b3f50de-f597-eb19-76ae-391f12bcc9e0',
          name: 'hoge',
          secretKey: 'e2e829d15-0c0f-31c8-c88d-e7231a3dac0d',
          joinedUsers: [
            {
              id: 'aaf7212c-1bba-db35-848a-366c57d543d1',
              name: 'hoge',
              secretKey: '80ee6d5e-52d3-e801-a37d-25bdaea6b580',
            },
          ],
        },
      ],
    };
  }
}
