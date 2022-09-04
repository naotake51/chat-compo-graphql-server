import { NotFoundException } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { DeveloperProductModel } from './models/developer-product.model';
import { ProductService } from '../products/product.service';

@Resolver((of) => DeveloperProductModel)
export class DeveloperProductResolver {
  constructor(private readonly productService: ProductService) {}

  @ResolveField()
  async product(@Parent() developerProduct: DeveloperProductModel) {
    const product = await this.productService.findById(
      developerProduct.productId,
    );
    if (!product) {
      throw new NotFoundException();
    }

    return product;
  }
}
