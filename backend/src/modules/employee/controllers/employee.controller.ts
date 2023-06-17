import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateEmployeeDto } from '../dtos/create-employee.dto';
import { Employee } from '../entities/employee.entity';
import { EmployeeService } from '../services/employee.service';
import { UpdateEmployeeDto } from '../dtos/update-employee.dto';
import { UuidParamValidator } from 'src/shared/validators/uuid-param.validator';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  create(@Body() employeeDto: CreateEmployeeDto): Promise<Employee> {
    return this.employeeService.create(employeeDto);
  }

  @Get()
  findAll(): Promise<Employee[]> {
    return this.employeeService.findAll();
  }

  @Get(':id')
  findOne(@Param() { id }: UuidParamValidator): Promise<Employee> {
    return this.employeeService.findOne(id);
  }

  @Put(':id')
  update(
    @Param() { id }: UuidParamValidator,
    @Body() EmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    return this.employeeService.update(id, EmployeeDto);
  }

  @Delete(':id')
  remove(@Param() { id }: UuidParamValidator): Promise<void> {
    return this.employeeService.remove(id);
  }
}
