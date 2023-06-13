import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm';

import { Funcionario } from '../entities/funcionario.entity';

@EntityRepository(Funcionario)
export class FuncionarioRepository extends Repository<Funcionario> {}
