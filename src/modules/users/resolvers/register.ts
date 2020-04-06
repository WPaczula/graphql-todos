import 'reflect-metadata';
import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import * as bcrypt from 'bcrypt';
import User from '../entity/user';
import RegisterInput from '../inputs/register';
import { UserRepository } from '../repositories';

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
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = UserRepository().create({
      userName,
      password: hashedPassword,
    });

    await UserRepository().save(user);

    return user;
  }
}

export default RegisterResolver;
