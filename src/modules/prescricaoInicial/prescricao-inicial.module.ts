import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PrescricaoInicial } from './entities/prescricao-inicial.entity';
import { PrescricaoInicialRepository } from './repositories/prescricao-inicial.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PrescricaoInicial])],
  providers: [PrescricaoInicialRepository],
  controllers: [],
  exports: [TypeOrmModule],
})
export class PrescricaoInicialModule {}
