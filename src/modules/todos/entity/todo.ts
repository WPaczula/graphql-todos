import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import User from '../../users/entity/user';
import { Lazy } from '../../../types/lazy';

@ObjectType()
@Entity('todos')
class Todo extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column('text')
  name: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.todos, { cascade: true, lazy: true })
  user: Lazy<User>;

  @Column()
  userId: string;
}

export default Todo;
