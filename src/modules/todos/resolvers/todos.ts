import { Resolver, Query } from 'type-graphql';
import Todo from '../entity/todo';
import { TodoRepository } from '../repositories';

@Resolver(Todo)
class TodosResolver {
  @Query(() => [Todo])
  async todos(): Promise<Todo[]> {
    const todos = await TodoRepository().find();

    return todos;
  }
}

export default TodosResolver;
