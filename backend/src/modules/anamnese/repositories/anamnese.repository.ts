import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm';

import { Anamnese } from '../entities/anamnese.entity';

@EntityRepository(Anamnese)
export class AnamneseRepository extends Repository<Anamnese> {}
