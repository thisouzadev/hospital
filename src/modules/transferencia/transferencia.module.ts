import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Transferencia } from './entities/transferencia.entity';
import { TransferenciaRepository } from './repositories/transferencia.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Transferencia])],
  providers: [TransferenciaRepository],
  controllers: [],
  exports: [TypeOrmModule],
})
export class TransferenciaModule {}
