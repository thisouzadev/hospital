import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm';

import { Transferencia } from '../entities/transferencia.entity';

@EntityRepository(Transferencia)
export class TransferenciaRepository extends Repository<Transferencia> {}
