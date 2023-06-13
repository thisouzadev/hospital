import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Endereco } from './entities/endereco.entity';
import { EnderecoRepository } from './repositories/endereco.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Endereco])],
  providers: [EnderecoRepository],
  controllers: [],
  exports: [TypeOrmModule],
})
export class EnderecoModule {}
