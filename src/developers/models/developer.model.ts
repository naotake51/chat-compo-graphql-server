import { Field, ObjectType } from '@nestjs/graphql';
import { DeveloperProduct } from '@/developer-products/models/developer-product.model';

@ObjectType()
export class Developer {
  @Field(() => String)
  id: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  encryptedPassword: string;

  @Field(() => [DeveloperProduct])
  joinedProducts: DeveloperProduct[];
}
