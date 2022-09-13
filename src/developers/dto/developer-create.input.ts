import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class DeveloperCreateInput {
  @Field({ nullable: false })
  email: string;

  @Field({ nullable: false })
  password: string;
}
