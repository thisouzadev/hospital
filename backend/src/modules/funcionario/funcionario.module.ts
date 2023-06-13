import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Funcionario } from './entities/funcionario.entity';
import { FuncionarioController } from './controllers/funcionario.controller';
import { FuncionarioService } from './services/funcionario.service';

import { FuncionarioRepository } from './repositories/funcionario.repository';
import { HospitalModule } from '../hospital/hospital.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Funcionario, FuncionarioRepository]),
    HospitalModule,
  ],
  controllers: [FuncionarioController],
  providers: [FuncionarioService],
})
export class FuncionarioModule {}
