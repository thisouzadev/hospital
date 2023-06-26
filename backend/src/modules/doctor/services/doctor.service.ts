import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from '../entities/doctor.entity';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
  ) {}

  findAll() {
    return this.doctorRepository.find({
      relations: ['employee', 'employee.hospital', 'schedules'],
      order: {
        schedules: {
          weekDay: 'ASC',
        },
      },
    });
  }

  findOne(doctorId: string) {
    return this.doctorRepository.findOneBy({ doctorId });
  }
}
