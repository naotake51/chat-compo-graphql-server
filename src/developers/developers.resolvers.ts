import {
  ForbiddenException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from '@/auth/decrators/currect-user.decrator';
import { DeveloperProductsService } from '@/developer-products/developer-products.service';
import { DevelopersService } from '@/developers/developers.service';
import { Developer } from '@/developers/models/developer.model';

@Resolver((of) => Developer)
export class DevelopersResolver {
  constructor(
    private readonly developersService: DevelopersService,
    private readonly developerProductsService: DeveloperProductsService,
  ) {}

  @Query(() => Developer, { name: 'developer', nullable: true })
  @UseGuards(JwtAuthGuard)
  async getDeveloper(
    @CurrentUser() user,
    @Args('id', { type: () => String }) id: string,
  ) {
    if (user.id !== id) {
      throw new ForbiddenException();
    }

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
