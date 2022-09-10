import { Field, ObjectType } from '@nestjs/graphql';
import { UserRoom } from '@/user-rooms/models/user-room.model';

@ObjectType()
export class User {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  secretKey: string;

  @Field(() => [UserRoom])
  joinedRooms: UserRoom[];
}
