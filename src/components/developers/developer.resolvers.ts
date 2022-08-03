import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { DeveloperModel } from './models/developer.model';

@Resolver((of) => DeveloperModel)
export class DeveloperResolver {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  @Query(() => DeveloperModel, { name: 'signedDeveloper', nullable: true })
  async getSignedDeveloper() {
    return {
      id: '86742cd7-608a-f372-e4e7-ef0a2ea23fc7',
      email: 'hoge@sample.com',
    };
  }

  @ResolveField()
  async joinedProducts(@Parent() signedDeveloper: DeveloperModel) {
    return [
      {
        product: {
          id: 'e67b06fd-c371-12d5-dbbe-f09456edd8d3',
          name: 'hoge',
          secretKey: 'ed7bc3cb-40c3-75f8-6c01-772b2178bb97',
          joinedDeveloper: [],
          users: [],
          rooms: [],
        },
      },
      {
        product: {
          id: 'a64d5c6d-5e66-2761-ce86-b83be8f60e3a',
          name: 'hoge',
          secretKey: 'b49befa4-65a2-24d5-f20d-f4006dcf53ba',
          joinedDeveloper: [],
          users: [],
          rooms: [],
        },
      },
    ];
  }
}
