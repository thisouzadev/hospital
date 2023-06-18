import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmployeeRepository } from './repositories/funcionario.repository';
import { HospitalModule } from '../hospital/hospital.module';
import { Employee } from './entities/employee.entity';
import { EmployeeService } from './services/employee.service';
import { EmployeeController } from './controllers/employee.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee, EmployeeRepository]),
    HospitalModule,
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
