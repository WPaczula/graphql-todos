import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import Todo from '../../todos/entity/todo';

@ObjectType()
@Entity('users')
class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column('text', { unique: true })
  userName: string;

  @Column('varchar', { length: 1024 })
  password: string;

  @Field(() => [Todo])
  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];
}

export default User;
