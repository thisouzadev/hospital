import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '../entities/employee.entity';
import { CreateEmployeeDto } from '../dtos/create-employee.dto';
import { UpdateEmployeeDto } from '../dtos/update-employee.dto';
import { User } from 'src/modules/user/entities/user.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(employeeDto: CreateEmployeeDto): Promise<Employee> {
    const employee = this.employeeRepository.create(employeeDto);

    return this.employeeRepository.save(employee);
  }

  findAll(): Promise<Employee[]> {
    return this.employeeRepository.find({
      relations: ['address', 'user', 'doctor'],
    });
  }

  async findOne(id: string): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({
      where: { employeeId: id },
    });
    console.log(employee);
    if (!employee) {
      throw new NotFoundException('Funcionário não encontrado');
    }
    return employee;
  }

  async update(
    employeeId: string,
    employeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({
      where: { employeeId },
      relations: ['user', 'address'],
    });
    if (!employee) {
      throw new NotFoundException('Funcionário não encontrado');
    }

    Object.assign(employee, {
      ...employeeDto,
      user: {
        ...employee.user,
        ...employeeDto.user,
        password: employee.user.password,
      },
      address: {
        ...employee.address,
        ...employeeDto.address,
      },
    });

    return this.employeeRepository.save(employee);
  }

  // na prática essa função não será utilizada no sistema
  // oque faremos será desativar o funcionário
  async remove(employeeId: string): Promise<void> {
    const employee = await this.employeeRepository.findOne({
      where: { employeeId },
      relations: ['user'],
    });
    if (!employee) {
      throw new NotFoundException('Funcionário não encontrado');
    }
    await this.userRepository.delete(employee.user.userId);

    await this.employeeRepository.remove(employee);
  }
}
