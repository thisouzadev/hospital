import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HospitalModule } from '../hospital/hospital.module';
import { Funcionario } from '../funcionario/entities/funcionario.entity';
import { FuncionarioRepository } from '../funcionario/repositories/funcionario.repository';
import { SessionsController } from './controllers/sessions.controller';
import { SessionsService } from './services/sessions.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Funcionario, FuncionarioRepository]),
    HospitalModule,
  ],
  controllers: [SessionsController],
  providers: [SessionsService],
})
export class SessionsModule {}
