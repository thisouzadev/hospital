import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm';

import { Employee } from '../entities/employee.entity';

@EntityRepository(Employee)
export class EmployeeRepository extends Repository<Employee> {}
