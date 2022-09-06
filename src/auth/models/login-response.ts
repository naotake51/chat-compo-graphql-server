import { Field, ObjectType } from '@nestjs/graphql';
import { Developer } from '@/developers/models/developer.model';

@ObjectType()
export class LoginResponse {
  @Field()
  accessToken: string;

  @Field(() => Developer)
  developer: Developer;
}
