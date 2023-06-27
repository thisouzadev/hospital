import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Transform } from 'class-transformer';
import { UuidParamValidator } from '../../../shared/validators/uuid-param.validator';
import { CreateDoctorScheduleDto } from '../dto/create-doctor-schedule.dto';
import { ListDoctorSchedulesQueryDto } from '../dto/list-doctor-schedules-query.dto';
import { UpdateDoctorScheduleDto } from '../dto/update-doctor-schedule.dto';
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
  async findAll(@Query() query: ListDoctorSchedulesQueryDto) {
    const result = await this.doctorScheduleService.findAll(query);
    return result;
  }

  @Put(':id')
  async update(
    @Param() { id }: UuidParamValidator,
    @Body() updatePatientDto: UpdateDoctorScheduleDto,
  ) {
    const result = await this.doctorScheduleService.update(
      id,
      updatePatientDto,
    );

    return new SuccessResult(result);
  }

  @Delete(':id')
  async findOne(@Param() { id }: UuidParamValidator) {
    await this.doctorScheduleService.remove(id);
    return { success: true };
  }
}
