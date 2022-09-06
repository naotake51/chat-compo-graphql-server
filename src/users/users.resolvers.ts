import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from '@/users/models/user.model';

@Resolver((of) => User)
export class UsersResolver {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  @Query(() => User, { name: 'signedUser', nullable: true })
  async getSignedUser(@Args('id', { type: () => String }) id: string) {
    return {
      id: '40061f88-f6ac-d2fc-167b-c5a860f79f54',
      name: 'hoge',
    };
  }

  @ResolveField()
  async joinedRooms(@Parent() signedUser: User) {
    return [
      {
        joinedMessageOrder: 1,
        readMessageOrder: 1,
        room: {
          id: 'aaf7212c-1bba-db35-848a-366c57d543d1',
          name: 'hoge',
          secretKey: '80ee6d5e-52d3-e801-a37d-25bdaea6b580',
          joinedUsers: [
            {
              joinedMessageOrder: 1,
              readMessageOrder: 1,
              user: {
                id: 'aaf7212c-1bba-db35-848a-366c57d543d1',
                name: 'hoge',
                secretKey: '80ee6d5e-52d3-e801-a37d-25bdaea6b580',
              },
            },
          ],
        },
      },
    ];
  }
}