import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateDeveloperInput {
  @Field({ nullable: false })
  id: string;

  @Field({ nullable: true })
  email?: string;
}
