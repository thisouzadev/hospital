import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateScheduleDto } from '../dto/create-schedule.dto';
import { UpdateScheduleDto } from '../dto/update-schedule.dto';
import { Schedule } from '../entities/schedule.entity';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}
  async create(createScheduleDto: CreateScheduleDto) {
    const schedule = this.scheduleRepository.create(createScheduleDto);
    await this.scheduleRepository.save(schedule);

    return schedule;
  }

  findAll() {
    return this.scheduleRepository.find({ relations: ['patient', 'doctor'] });
  }

  async findOne(scheduleId: string) {
    const schedule = await this.scheduleRepository.findOneBy({
      scheduleId,
    });

    if (!schedule) {
      throw new NotFoundException('Agendamento não encontrado');
    }
    return schedule;
  }

  async update(scheduleId: string, updateScheduleDto: UpdateScheduleDto) {
    const schedule = await this.scheduleRepository.findOneBy({
      scheduleId,
    });

    if (!schedule) {
      throw new NotFoundException('Agendamento não encontrado');
    }

    Object.assign(schedule, updateScheduleDto);

    await this.scheduleRepository.save(schedule);
    return schedule;
  }

  async remove(scheduleId: string) {
    const schedule = await this.scheduleRepository.findOneBy({
      scheduleId,
    });

    if (!schedule) {
      throw new NotFoundException('Agendamento não encontrado');
    }

    await this.scheduleRepository.remove(schedule);
  }
}
