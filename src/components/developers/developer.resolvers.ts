import { NotFoundException } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { DeveloperService } from './developer.service';
import { DeveloperModel } from './models/developer.model';
import { DeveloperProductService } from '@/components/developer-product/developer-product.service';

@Resolver((of) => DeveloperModel)
export class DeveloperResolver {
  constructor(
    private readonly developerService: DeveloperService,
    private readonly developerProductService: DeveloperProductService,
  ) {}

  @Query(() => DeveloperModel, { name: 'signedDeveloper', nullable: true })
  async getSignedDeveloper(@Args('id', { type: () => String }) id: string) {
    const developer = await this.developerService.findById(id);
    if (!developer) {
      throw new NotFoundException();
    }

    return developer;
  }

  @ResolveField()
  async joinedProducts(@Parent() developer: DeveloperModel) {
    const developerProducts =
      await this.developerProductService.findManyByDeveloperId(developer.id);

    return developerProducts;
  }
}
