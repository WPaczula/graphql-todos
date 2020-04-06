import { IsNotEmpty } from 'class-validator';
import { InputType, Field } from 'type-graphql';

@InputType()
class MarkTodoAsDone {
  @IsNotEmpty()
  @Field(() => [String])
  ids: string[];
}

export default MarkTodoAsDone;
