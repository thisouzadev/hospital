import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Consulta } from './entities/consulta.entity';
import { ConsultaRepository } from './repositories/consulta.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Consulta])],
  providers: [ConsultaRepository],
  controllers: [],
  exports: [TypeOrmModule],
})
export class ConsultaModule {}
