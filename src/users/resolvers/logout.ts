import { Resolver, Mutation, Ctx } from 'type-graphql';
import Context from '../../context';

@Resolver()
class LogoutResolver {
  @Mutation(() => Boolean)
  async logout(@Ctx() context: Context) {
    return new Promise((resolve, reject) => {
      context.req.session?.destroy((error) => {
        if (error) {
          // eslint-disable-next-line no-console
          console.error(error);
          reject(error);
        }

        context.res.clearCookie('qid');
        resolve(true);
      });
    });
  }
}

export default LogoutResolver;
