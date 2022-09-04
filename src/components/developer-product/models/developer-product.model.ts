import { Field, ObjectType } from '@nestjs/graphql';
import { DeveloperModel } from '@/components/developers/models/developer.model';
import { ProductModel } from '@/components/products/models/product.model';

@ObjectType()
export class DeveloperProductModel {
  @Field((type) => ProductModel)
  product: ProductModel;

  @Field((type) => String)
  productId: string;

  @Field((type) => DeveloperModel)
  developer: DeveloperModel;

  @Field((type) => String)
  developerId: string;

  @Field((type) => String)
  createdAt: string;
}
