import { Length } from 'class-validator';
import { InputType, Field } from 'type-graphql';
import UniqueUserName from './uniqueUsername';

@InputType()
class RegisterInput {
  @Length(3, 255)
  @Field()
  @UniqueUserName({ message: 'User name already in use' })
  userName: string;

  @Length(5, 255)
  @Field()
  password: string;
}

export default RegisterInput;
