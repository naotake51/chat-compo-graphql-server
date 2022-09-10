import { Field, ObjectType } from '@nestjs/graphql';
import { DeveloperProduct } from '@/developer-products/models/developer-product.model';
import { Room } from '@/rooms/models/room.model';
import { User } from '@/users/models/user.model';

@ObjectType()
export class Product {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  secretKey: string;

  @Field(() => [DeveloperProduct])
  joinedDeveloper: DeveloperProduct[];

  @Field(() => [User])
  users: User[];

  @Field(() => [Room])
  rooms: Room[];
}
