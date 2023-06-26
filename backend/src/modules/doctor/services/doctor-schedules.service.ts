import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DoctorSchedule } from '../entities/doctor-schedule.entity';
import { CreateDoctorScheduleDto } from '../dto/create-doctor-schedule.dto';

@Injectable()
export class DoctorScheduleScheduleService {
  constructor(
    @InjectRepository(DoctorSchedule)
    private readonly doctorScheduleRepository: Repository<DoctorSchedule>,
  ) {}

  findAll() {
    return this.doctorScheduleRepository.find({
      relations: [],
    });
  }

  async create(createDto: CreateDoctorScheduleDto) {
    const doctorSchedule = this.doctorScheduleRepository.create(createDto);
    await this.doctorScheduleRepository.save(doctorSchedule);
    return doctorSchedule;
  }

  async remove(scheduleId: string) {
    const doctorSchedule = await this.doctorScheduleRepository.findOneBy({
      scheduleId,
    });
    if (!doctorSchedule) {
      throw new NotFoundException('Agenda não encontrada');
    }

    await this.doctorScheduleRepository.remove(doctorSchedule);
  }
}
