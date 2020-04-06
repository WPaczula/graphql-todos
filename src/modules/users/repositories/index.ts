import { getRepository } from 'typeorm';
import User from '../entity/user';

// eslint-disable-next-line import/prefer-default-export
export const UserRepository = () => getRepository(User);
