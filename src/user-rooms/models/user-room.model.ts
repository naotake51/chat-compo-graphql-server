import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from '@/users/models/user.model';
import { Room } from '@/rooms/models/room.model';

@ObjectType()
export class UserRoom {
  @Field((type) => Room)
  room: Room;

  @Field((type) => User)
  user: User;

  @Field((type) => Int)
  joinedMessageOrder: number;

  @Field((type) => Int)
  readMessageOrder: number;
}
