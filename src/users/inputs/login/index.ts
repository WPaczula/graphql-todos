import { Length } from 'class-validator';
import { InputType, Field } from 'type-graphql';

@InputType()
class LoginInput {
  @Length(3, 255)
  @Field()
  userName: string;

  @Length(5, 255)
  @Field()
  password: string;
}

export default LoginInput;
