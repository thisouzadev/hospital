import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm';

import { User } from '../entities/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {}
