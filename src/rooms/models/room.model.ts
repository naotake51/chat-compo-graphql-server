import { Field, ObjectType } from '@nestjs/graphql';
import { TalkerRoom } from '@/talker-rooms/models/talker-room.model';

@ObjectType()
export class Room {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  secretKey: string;

  @Field(() => [TalkerRoom])
  joinedTalkers: TalkerRoom[];
}
