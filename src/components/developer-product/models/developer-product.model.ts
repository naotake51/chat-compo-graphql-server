import { Field, Int, ObjectType } from '@nestjs/graphql';
import { DeveloperModel } from '@/components/developers/models/developer.model';
import { ProductModel } from '@/components/products/models/product.model';

@ObjectType()
export class DeveloperProductModel {
  @Field((type) => ProductModel)
  product: ProductModel;

  @Field((type) => DeveloperModel)
  developer: DeveloperModel;
}
