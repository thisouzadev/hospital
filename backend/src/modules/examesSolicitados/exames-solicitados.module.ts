import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExamesSolicitados } from './entities/exames-solicitados.entity';
import { ExamesSolicitadosRepository } from './repositories/exames-solicitados.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ExamesSolicitados])],
  providers: [ExamesSolicitadosRepository],
  controllers: [],
  exports: [TypeOrmModule],
})
export class ExamesSolicitadosModule {}
