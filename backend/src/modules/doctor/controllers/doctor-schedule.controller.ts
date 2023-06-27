import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { UuidParamValidator } from '../../../shared/validators/uuid-param.validator';
import { CreateDoctorScheduleDto } from '../dto/create-doctor-schedule.dto';
import { ListDoctorSchedulesQueryDto } from '../dto/list-doctor-schedules-query.dto';
import { DoctorSchedule } from '../entities/doctor-schedule.entity';
import { DoctorScheduleService } from '../services/doctor-schedules.service';

class SuccessResult<T> {
  constructor(data: T) {
    this.result = data;
  }
  public success = true;
  public result: T;
}

@Controller('doctor-schedules')
export class DoctorScheduleController {
  constructor(private readonly doctorScheduleService: DoctorScheduleService) {}

  @Post()
  async create(
    @Body() doctorScheduleDto: CreateDoctorScheduleDto,
  ): Promise<SuccessResult<DoctorSchedule>> {
    const schedule = await this.doctorScheduleService.create(doctorScheduleDto);
    return new SuccessResult(schedule);
  }

  @Get()
  findAll(@Query() query: ListDoctorSchedulesQueryDto) {
    return this.doctorScheduleService.findAll(query);
  }

  @Delete(':id')
  async findOne(@Param() { id }: UuidParamValidator) {
    await this.doctorScheduleService.remove(id);
    return { success: true };
  }
}
