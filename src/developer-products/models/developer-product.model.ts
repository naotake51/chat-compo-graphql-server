import { Field, ObjectType } from '@nestjs/graphql';
import { Developer } from '@/developers/models/developer.model';
import { Product } from '@/products/models/product.model';

@ObjectType()
export class DeveloperProduct {
  @Field(() => Product)
  product: Product;

  @Field(() => String)
  productId: string;

  @Field(() => Developer)
  developer: Developer;

  @Field(() => String)
  developerId: string;

  @Field(() => String)
  createdAt: string;
}
