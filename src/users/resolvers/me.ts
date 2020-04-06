import 'reflect-metadata';
import { Resolver, Query, Ctx } from 'type-graphql';
import User from '../entity/user';
import Context from '../../context';

@Resolver()
class MeResolver {
  @Query(() => User)
  async me(@Ctx() context: Context) {
    const { userId } = context.req.session!;
    if (!userId) {
      return null;
    }

    return User.findOne(userId);
  }
}

export default MeResolver;
