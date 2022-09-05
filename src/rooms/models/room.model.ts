import { Field, ObjectType } from '@nestjs/graphql';
import { UserRoom } from '@/user-rooms/models/user-room.model';

@ObjectType()
export class Room {
  @Field((type) => String)
  id: string;

  @Field((type) => String)
  name: string;

  @Field((type) => String)
  secretKey: string;

  @Field((type) => [UserRoom])
  joinedUsers: UserRoom[];
}
