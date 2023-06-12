import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm';

import { Tratamento } from '../entities/tratamento.entity';

@EntityRepository(Tratamento)
export class TratamentoRepository extends Repository<Tratamento> {}
