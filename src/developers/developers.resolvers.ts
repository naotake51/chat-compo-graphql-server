import { NotFoundException } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { DevelopersService } from '@/developers/developers.service';
import { Developer } from '@/developers/models/developer.model';
import { DeveloperProductsService } from '@/developer-products/developer-products.service';

@Resolver((of) => Developer)
export class DevelopersResolver {
  constructor(
    private readonly developersService: DevelopersService,
    private readonly developerProductsService: DeveloperProductsService,
  ) {}

  @Query(() => Developer, { name: 'signedDeveloper', nullable: true })
  async getSignedDeveloper(@Args('id', { type: () => String }) id: string) {
    const developer = await this.developersService.findById(id);
    if (!developer) {
      throw new NotFoundException();
    }

    return developer;
  }

  @ResolveField()
  async joinedProducts(@Parent() developer: Developer) {
    const developerProducts =
      await this.developerProductsService.findManyByDeveloperId(developer.id);

    return developerProducts;
  }
}
