import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm';

import { EvolucaoPrescricao } from '../entities/evolucao-prescricao.entity';

@EntityRepository(EvolucaoPrescricao)
export class EvolucaoPrescricaoRepository extends Repository<EvolucaoPrescricao> {}
