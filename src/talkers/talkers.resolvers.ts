import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Talker } from '@/talkers/models/talker.model';

@Resolver(() => Talker)
export class TalkersResolver {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  @Query(() => Talker, { name: 'talker', nullable: true })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getTalker(@Args('id', { type: () => String }) id: string) {
    return {
      id: '40061f88-f6ac-d2fc-167b-c5a860f79f54',
      name: 'hoge',
    };
  }

  @ResolveField()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async joinedRooms(@Parent() signedTalker: Talker) {
    return [
      {
        joinedMessageOrder: 1,
        readMessageOrder: 1,
        room: {
          id: 'aaf7212c-1bba-db35-848a-366c57d543d1',
          name: 'hoge',
          secretKey: '80ee6d5e-52d3-e801-a37d-25bdaea6b580',
          joinedTalkers: [
            {
              joinedMessageOrder: 1,
              readMessageOrder: 1,
              talker: {
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
