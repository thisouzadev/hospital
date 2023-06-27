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

const successResult = <T>(data: T = undefined, message?: string) => {
  return {
    success: true,
    message,
    result: data,
  };
};

@Controller('doctor-schedules')
export class DoctorScheduleController {
  constructor(private readonly doctorScheduleService: DoctorScheduleService) {}

  @Post()
  async create(@Body() doctorScheduleDto: CreateDoctorScheduleDto) {
    return successResult(
      await this.doctorScheduleService.create(doctorScheduleDto),
    );
  }

  @Get()
  async findAll(@Query() query: ListDoctorSchedulesQueryDto) {
    return successResult(await this.doctorScheduleService.findAll(query));
  }

  @Put(':id')
  async update(
    @Param() { id }: UuidParamValidator,
    @Body() updatePatientDto: UpdateDoctorScheduleDto,
  ) {
    return successResult(
      await this.doctorScheduleService.update(id, updatePatientDto),
    );
  }

  @Delete(':id')
  async findOne(@Param() { id }: UuidParamValidator) {
    return successResult(await this.doctorScheduleService.remove(id));
  }
}
