import { Field, ObjectType } from '@nestjs/graphql';
import { UserRoomModel } from '@/components/user-room/models/user-room.model';

@ObjectType()
export class UserModel {
  @Field((type) => String)
  id: string;

  @Field((type) => String)
  name: string;

  @Field((type) => String)
  secretKey: string;

  @Field((type) => [UserRoomModel])
  joinedRooms: UserRoomModel[];
}
