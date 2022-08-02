import { Field, ObjectType } from '@nestjs/graphql';
import { ProductModel } from '../../products/models/product.model';

@ObjectType()
export class DeveloperModel {
  @Field((type) => String)
  id: string;

  @Field((type) => String)
  email: string;

  @Field((type) => String)
  encryptedPassword: string;

  @Field((type) => [ProductModel])
  joinedProducts: ProductModel[];
}
