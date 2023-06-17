import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Employee } from '../entities/employee.entity';
import { CreateEmployeeDto } from '../dtos/create-employee.dto';
import { UpdateEmployeeDto } from '../dtos/update-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async create(employeeDto: CreateEmployeeDto): Promise<Employee> {
    const employee = this.employeeRepository.create(employeeDto);

    return this.employeeRepository.save(employee);
  }

  findAll(): Promise<Employee[]> {
    return this.employeeRepository.find({ relations: ['hospital'] });
  }

  findOne(id: string): Promise<Employee> {
    return this.employeeRepository.findOne({ where: { employeeId: id } });
  }

  async update(id: string, EmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    await this.employeeRepository.update(id, {
      ...EmployeeDto,
    });

    return this.employeeRepository.findOne({ where: { employeeId: id } });
  }

  async remove(id: number): Promise<void> {
    await this.employeeRepository.delete(id);
  }
}
