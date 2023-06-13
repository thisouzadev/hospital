import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Tratamento } from './entities/tratamento.entity';
import { TratamentoRepository } from './repositories/tratamento.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Tratamento])],
  providers: [TratamentoRepository],
  controllers: [],
  exports: [TypeOrmModule],
})
export class TratamentoModule {}
