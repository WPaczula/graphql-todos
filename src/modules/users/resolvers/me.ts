import 'reflect-metadata';
import { Resolver, Query, Ctx } from 'type-graphql';
import User from '../entity/user';
import Context from '../../../context';
import { UserRepository } from '../repositories';

@Resolver()
class MeResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() context: Context) {
    const { userId } = context.req.session!;
    if (!userId) {
      return null;
    }

    return UserRepository().findOne(userId);
  }
}

export default MeResolver;
