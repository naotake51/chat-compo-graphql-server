import {
  ForbiddenException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { DeveloperCreateInput } from './dto/developer-create.input';
import { DeveloperUpdateInput } from './dto/developer-update.input';
import { AuthUser } from '@/auth/decrators/auth-user.decrator';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { DeveloperProductsService } from '@/developer-products/developer-products.service';
import { DevelopersService } from '@/developers/developers.service';
import { Developer } from '@/developers/models/developer.model';

const pubSub = new PubSub();

@Resolver(() => Developer)
export class DevelopersResolver {
  constructor(
    private readonly developersService: DevelopersService,
    private readonly developerProductsService: DeveloperProductsService,
  ) {}

  @Query(() => Developer, { name: 'developer', nullable: true })
  @UseGuards(JwtAuthGuard)
  async getDeveloper(
    @AuthUser() authUser,
    @Args('id', { type: () => String }) id: string,
  ) {
    if (id !== authUser.id) {
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
  async createDeveloper(
    @Args('data', { type: () => DeveloperCreateInput })
    developer: DeveloperCreateInput,
  ) {
    const createdDeveloper = await this.developersService.create(developer);

    pubSub.publish('developerCreated', { developerUpdated: createdDeveloper });

    return createdDeveloper;
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Developer)
  async updateDeveloper(
    @AuthUser() authUser,
    @Args('data', { type: () => DeveloperUpdateInput })
    developer: DeveloperUpdateInput,
  ) {
    if (developer.id !== authUser.id) {
      throw new ForbiddenException();
    }

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
  developerUpdated(@Context() context, @Args('id') id: string) {
    if (context.payload.sub !== id) {
      throw new ForbiddenException();
    }

    return pubSub.asyncIterator('developerUpdated');
  }
}
