import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserModel } from '../../users/models/user.model';
import { RoomModel } from '../../rooms/models/room.model';

@ObjectType()
export class UserRoomModel {
  @Field((type) => RoomModel)
  room: RoomModel;

  @Field((type) => UserModel)
  user: UserModel;

  @Field((type) => Int)
  joinedMessageOrder: number;

  @Field((type) => Int)
  readMessageOrder: number;
}
