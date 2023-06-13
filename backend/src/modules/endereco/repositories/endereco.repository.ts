import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm';

import { Endereco } from '../entities/endereco.entity';

@EntityRepository(Endereco)
export class EnderecoRepository extends Repository<Endereco> {}
