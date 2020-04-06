import { MinLength } from 'class-validator';
import { InputType, Field } from 'type-graphql';

@InputType()
class CreateTodoInput {
  @MinLength(3)
  @Field()
  name: string;
}

export default CreateTodoInput;
