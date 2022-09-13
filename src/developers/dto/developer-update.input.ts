import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class DeveloperUpdateInput {
  @Field({ nullable: false })
  id: string;

  @Field({ nullable: true })
  email?: string;
}
