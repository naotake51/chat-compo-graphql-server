import { Field, ObjectType } from '@nestjs/graphql';
import { RoomModel } from '../../rooms/models/room.model';

@ObjectType()
export class UserModel {
  @Field((type) => String)
  id: string;

  @Field((type) => String)
  name: string;

  @Field((type) => String)
  secretKey: string;

  @Field((type) => [RoomModel])
  joinedRooms: RoomModel[];
}
