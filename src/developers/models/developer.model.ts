import { Field, ObjectType } from '@nestjs/graphql';
import { DeveloperProduct } from '@/developer-products/models/developer-product.model';

@ObjectType()
export class Developer {
  @Field((type) => String)
  id: string;

  @Field((type) => String)
  email: string;

  @Field((type) => String)
  encryptedPassword: string;

  @Field((type) => [DeveloperProduct])
  joinedProducts: DeveloperProduct[];
}
