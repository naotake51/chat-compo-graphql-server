import {
  ForbiddenException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateDeveloperInput } from './dto/update-developer.input';
import { CurrentUser } from '@/auth/decrators/currect-user.decrator';
import { DeveloperProductsService } from '@/developer-products/developer-products.service';
import { DevelopersService } from '@/developers/developers.service';
import { Developer } from '@/developers/models/developer.model';

const pubSub = new PubSub();

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

  @Mutation(() => Developer)
  async updateDeveloper(
    @Args('data', { type: () => UpdateDeveloperInput })
    developer: Developer,
  ) {
    const updatedDeveloper = await this.developersService.update(developer);
    if (!updatedDeveloper) {
      throw new NotFoundException();
    }

    pubSub.publish('developerUpdated', { developerUpdated: updatedDeveloper });

    return updatedDeveloper;
  }

  @Subscription(() => Developer, {
    filter(this: DevelopersResolver, payload, variables) {
      return payload.developerUpdated.id === variables.id;
    },
  })
  developerUpdated(@Args('id') id: string) {
    return pubSub.asyncIterator('developerUpdated');
  }
}
