import 'reflect-metadata';
import { Resolver, Mutation, Arg, Ctx } from 'type-graphql';
import * as bcrypt from 'bcrypt';
import User from '../entity/user';
import LoginInput from '../inputs/login';
import Context from '../../context';

@Resolver()
class LoginResolver {
  @Mutation(() => User, { nullable: true })
  async login(
    @Arg('data') { userName, password }: LoginInput,
    @Ctx() context: Context,
  ): Promise<User | null> {
    const user = await User.findOne({ where: { userName } });

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    // eslint-disable-next-line no-param-reassign
    context.req.session!.userId = user.id;

    return user;
  }
}

export default LoginResolver;
