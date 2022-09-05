import { Field, ObjectType } from '@nestjs/graphql';
import { DeveloperProduct } from '@/developer-products/models/developer-product.model';
import { User } from '@/users/models/user.model';
import { Room } from '@/rooms/models/room.model';

@ObjectType()
export class Product {
  @Field((type) => String)
  id: string;

  @Field((type) => String)
  name: string;

  @Field((type) => String)
  secretKey: string;

  @Field((type) => [DeveloperProduct])
  joinedDeveloper: DeveloperProduct[];

  @Field((type) => [User])
  users: User[];

  @Field((type) => [Room])
  rooms: Room[];
}
