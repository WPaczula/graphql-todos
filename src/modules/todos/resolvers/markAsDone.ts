import { Resolver, Arg, Mutation } from 'type-graphql';
import { In } from 'typeorm';
import MarkTodoAsDone from '../inputs/markAsDone';
import { TodoRepository } from '../repositories';
import Todo from '../entity/todo';

@Resolver()
class MarkAsDoneResolver {
  @Mutation(() => [Todo])
  async markAsDone(
    @Arg('data') { ids }: MarkTodoAsDone,
  ): Promise<Todo[] | null> {
    const todos = await TodoRepository().find({ where: { id: In(ids) } });

    if (todos.length === 0) {
      return null;
    }

    await TodoRepository().remove(todos);

    return todos;
  }
}

export default MarkAsDoneResolver;
