import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EvolucaoPrescricao } from './entities/evolucao-prescricao.entity';
import { EvolucaoPrescricaoRepository } from './repositories/evolucao-prescricao.repository';

@Module({
  imports: [TypeOrmModule.forFeature([EvolucaoPrescricao])],
  providers: [EvolucaoPrescricaoRepository],
  controllers: [],
  exports: [TypeOrmModule],
})
export class EvolucaoPrescricaoModule {}
