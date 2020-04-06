import { Resolver, Mutation, Ctx, Arg } from 'type-graphql';
import Context from '../../../context';
import { TodoRepository } from '../repositories';
import Todo from '../entity/todo';
import CreateTodoInput from '../inputs/create';

@Resolver(Todo)
class CreateTodoResolver {
  @Mutation(() => Todo)
  async createTodo(
    @Arg('data') { name }: CreateTodoInput,
    @Ctx() context: Context,
  ): Promise<Todo | null> {
    const { userId } = context.req.session!;

    if (!userId) {
      return null;
    }

    const todo = TodoRepository().create({ name, userId });
    await TodoRepository().save(todo);

    return todo;
  }
}

export default CreateTodoResolver;
