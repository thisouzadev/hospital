import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm';

import { ExamesSolicitados } from '../entities/exames-solicitados.entity';

@EntityRepository(ExamesSolicitados)
export class ExamesSolicitadosRepository extends Repository<ExamesSolicitados> {}
