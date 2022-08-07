import { NotFoundException } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { DeveloperService } from './developer.service';
import { DeveloperModel } from './models/developer.model';

@Resolver((of) => DeveloperModel)
export class DeveloperResolver {
  constructor(private readonly developerService: DeveloperService) {}

  @Query(() => DeveloperModel, { name: 'signedDeveloper', nullable: true })
  async getSignedDeveloper(@Args('id', { type: () => String }) id: string) {
    const developer = await this.developerService.findById(
      '86742cd7-608a-f372-e4e7-ef0a2ea23fc7',
    );
    if (!developer) {
      throw new NotFoundException();
    }

    return developer;
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
    ];
  }
}
