import { NotFoundException } from '@nestjs/common';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { DeveloperProduct } from '@/developer-products/models/developer-product.model';
import { ProductsService } from '@/products/products.service';

@Resolver(() => DeveloperProduct)
export class DeveloperProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @ResolveField()
  async product(@Parent() developerProduct: DeveloperProduct) {
    const product = await this.productsService.findById(
      developerProduct.productId,
    );
    if (!product) {
      throw new NotFoundException();
    }

    return product;
  }
}
