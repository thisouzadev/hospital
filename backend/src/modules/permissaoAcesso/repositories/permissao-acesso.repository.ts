import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm';

import { PermissaoAcesso } from '../entities/permissao-acesso.entity';

@EntityRepository(PermissaoAcesso)
export class PermissaoAcessoRepository extends Repository<PermissaoAcesso> {}
