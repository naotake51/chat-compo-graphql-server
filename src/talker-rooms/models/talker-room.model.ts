import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Room } from '@/rooms/models/room.model';
import { Talker } from '@/talkers/models/talker.model';

@ObjectType()
export class TalkerRoom {
  @Field(() => Room)
  room: Room;

  @Field(() => Talker)
  talker: Talker;

  @Field(() => Int)
  joinedMessageOrder: number;

  @Field(() => Int)
  readMessageOrder: number;
}
