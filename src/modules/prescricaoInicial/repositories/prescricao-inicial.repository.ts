import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm';

import { PrescricaoInicial } from '../entities/prescricao-inicial.entity';

@EntityRepository(PrescricaoInicial)
export class PrescricaoInicialRepository extends Repository<PrescricaoInicial> {}
