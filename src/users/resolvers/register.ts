import 'reflect-metadata';
import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import hash from '../utils/hash';
import User from '../entity/user';
import RegisterInput from '../inputs/register';

@Resolver()
class RegisterResolver {
  @Query(() => String)
  async hello() {
    return 'Hello';
  }

  @Mutation(() => User)
  async register(
    @Arg('data') { userName, password }: RegisterInput,
  ): Promise<User> {
    const hashedPassword = await hash(password);

    const user = await User.create({
      userName,
      password: hashedPassword,
    }).save();

    return user;
  }
}

export default RegisterResolver;
