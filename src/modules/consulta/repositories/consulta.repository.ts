import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm';

import { Consulta } from '../entities/consulta.entity';

@EntityRepository(Consulta)
export class ConsultaRepository extends Repository<Consulta> {}
