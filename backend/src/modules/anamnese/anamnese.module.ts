import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Anamnese } from './entities/anamnese.entity';
import { AnamneseRepository } from './repositories/anamnese.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Anamnese])],
  providers: [AnamneseRepository],
  controllers: [],
  exports: [TypeOrmModule],
})
export class AnamneseModule {}
