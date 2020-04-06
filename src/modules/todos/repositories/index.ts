import { getRepository } from 'typeorm';
import Todo from '../entity/todo';

// eslint-disable-next-line import/prefer-default-export
export const TodoRepository = () => getRepository(Todo);
