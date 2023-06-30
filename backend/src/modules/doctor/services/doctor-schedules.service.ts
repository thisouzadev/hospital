import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, IsNull, Repository } from 'typeorm';
import { DoctorSchedule } from '../entities/doctor-schedule.entity';
import { CreateDoctorScheduleDto } from '../dto/create-doctor-schedule.dto';
import { ListDoctorSchedulesQueryDto } from '../dto/list-doctor-schedules-query.dto';
import { UpdateDoctorScheduleDto } from '../dto/update-doctor-schedule.dto';

@Injectable()
export class DoctorScheduleService {
  constructor(
    @InjectRepository(DoctorSchedule)
    private readonly doctorScheduleRepository: Repository<DoctorSchedule>,
  ) {}

  findAll(query: ListDoctorSchedulesQueryDto) {
    const {
      attendanceStartDate = '1900-01-01',
      attendanceEndDate = '2099-12-31',
      ...restOfQuery
    } = query;

    return this.doctorScheduleRepository.find({
      where: {
        ...restOfQuery,
        attendances: [
          {
            attendanceDate: Between(attendanceStartDate, attendanceEndDate),
          },
          {
            attendanceDate: IsNull(),
          },
        ],
      },
      relations: ['attendances'],
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

  async update(scheduleId: string, updatePatientDto: UpdateDoctorScheduleDto) {
    const doctorSchedule = await this.doctorScheduleRepository.findOneBy({
      scheduleId,
    });

    if (!doctorSchedule) {
      throw new NotFoundException('Paciente não encontrado');
    }

    Object.assign(doctorSchedule, updatePatientDto);

    await this.doctorScheduleRepository.save(doctorSchedule);

    return doctorSchedule;
  }
}
