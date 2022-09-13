import { Field, ObjectType } from '@nestjs/graphql';
import { DeveloperProduct } from '@/developer-products/models/developer-product.model';
import { Room } from '@/rooms/models/room.model';
import { Talker } from '@/talkers/models/talker.model';

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

  @Field(() => [Talker])
  talkers: Talker[];

  @Field(() => [Room])
  rooms: Room[];
}
