import { Field, ObjectType } from '@nestjs/graphql';
import { DeveloperProductModel } from '../../developer-product/models/developer-product.model';

@ObjectType()
export class DeveloperModel {
  @Field((type) => String)
  id: string;

  @Field((type) => String)
  email: string;

  @Field((type) => String)
  encryptedPassword: string;

  @Field((type) => [DeveloperProductModel])
  joinedProducts: DeveloperProductModel[];
}
