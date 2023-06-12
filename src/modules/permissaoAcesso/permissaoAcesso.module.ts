import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PermissaoAcesso } from './entities/permissao-acesso.entity';
import { PermissaoAcessoRepository } from './repositories/permissao-acesso.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PermissaoAcesso])],
  providers: [PermissaoAcessoRepository],
  controllers: [],
  exports: [TypeOrmModule],
})
export class PermissaoAcessoModule {}
