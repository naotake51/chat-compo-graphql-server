import { Field, ObjectType } from '@nestjs/graphql';
import { DeveloperProductModel } from '@/components/developer-product/models/developer-product.model';
import { UserModel } from '@/components/users/models/user.model';
import { RoomModel } from '@/components/rooms/models/room.model';

@ObjectType()
export class ProductModel {
  @Field((type) => String)
  id: string;

  @Field((type) => String)
  name: string;

  @Field((type) => String)
  secretKey: string;

  @Field((type) => [DeveloperProductModel])
  joinedDeveloper: DeveloperProductModel[];

  @Field((type) => [UserModel])
  users: UserModel[];

  @Field((type) => [RoomModel])
  rooms: RoomModel[];
}
