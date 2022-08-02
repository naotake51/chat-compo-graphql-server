import { Field, ObjectType } from '@nestjs/graphql';
import { UserModel } from '../../users/models/user.model';

@ObjectType()
export class RoomModel {
  @Field((type) => String)
  id: string;

  @Field((type) => String)
  name: string;

  @Field((type) => String)
  secretKey: string;

  @Field((type) => [UserModel])
  joinedUsers: UserModel[];
}
