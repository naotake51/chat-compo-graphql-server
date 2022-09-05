import { Field, ObjectType } from '@nestjs/graphql';
import { Developer } from '@/developers/models/developer.model';
import { Product } from '@/products/models/product.model';

@ObjectType()
export class DeveloperProduct {
  @Field((type) => Product)
  product: Product;

  @Field((type) => String)
  productId: string;

  @Field((type) => Developer)
  developer: Developer;

  @Field((type) => String)
  developerId: string;

  @Field((type) => String)
  createdAt: string;
}
