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
@Controller('doctor-schedules')
export class DoctorScheduleController {
  constructor(private readonly doctorScheduleService: DoctorScheduleService) {}

  @Post()
  create(
    @Body() doctorScheduleDto: CreateDoctorScheduleDto,
  ): Promise<DoctorSchedule> {
    return this.doctorScheduleService.create(doctorScheduleDto);
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
