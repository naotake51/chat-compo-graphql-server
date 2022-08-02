import { Field, Int, ObjectType } from '@nestjs/graphql';
import { DeveloperModel } from '../../developers/models/developer.model';
import { ProductModel } from '../../products/models/product.model';

@ObjectType()
export class DeveloperProductModel {
  @Field((type) => ProductModel)
  product: ProductModel;

  @Field((type) => DeveloperModel)
  developer: DeveloperModel;
}
