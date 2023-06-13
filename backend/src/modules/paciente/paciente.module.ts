import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paciente } from './entities/paciente.entity';
import { PacienteRepository } from './repositories/paciente.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Paciente])],
  providers: [PacienteRepository],
  controllers: [],
  exports: [TypeOrmModule],
})
export class PacienteModule {}
