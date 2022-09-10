import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Room } from '@/rooms/models/room.model';
import { User } from '@/users/models/user.model';

@ObjectType()
export class UserRoom {
  @Field(() => Room)
  room: Room;

  @Field(() => User)
  user: User;

  @Field(() => Int)
  joinedMessageOrder: number;

  @Field(() => Int)
  readMessageOrder: number;
}
