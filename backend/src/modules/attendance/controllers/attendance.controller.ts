import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AttendanceService } from '../services/attendance.service';
import { CreateAttendanceDto } from '../dto/create-attendance.dto';
import { UpdateAttendanceDto } from '../dto/update-attendance.dto';
import { UuidParamValidator } from '../../../shared/validators/uuid-param.validator';
import { ListAttendanceQueryDto } from '../dto/list-attendances-query.dto';
import { AuthGuard } from '@nestjs/passport';
import successResult, {
  SuccessPresenter,
} from '../../../shared/presenters/success-result.presenter';

// returnDecorator.ts

// @UseGuards(AuthGuard())
@Controller('Attendances')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  @SuccessPresenter('Atendimento agendado com sucesso')
  create(@Body() createAttendanceDto: CreateAttendanceDto) {
    return this.attendanceService.create(createAttendanceDto);
  }

  // @Get()
  // findAll(@Query() query: ListAttendanceQueryDto) {
  //   return this.attendanceService.findAll(query);
  // }

  @Get()
  @SuccessPresenter()
  findAll(@Query() query: ListAttendanceQueryDto) {
    return this.attendanceService.findAll(query);
  }

  @Get(':id')
  @SuccessPresenter()
  findOne(@Param() { id }: UuidParamValidator) {
    return this.attendanceService.findOne(id);
  }

  @Put(':id')
  @SuccessPresenter()
  update(
    @Param() { id }: UuidParamValidator,
    @Body() updateAttendanceDto: UpdateAttendanceDto,
  ) {
    return this.attendanceService.update(id, updateAttendanceDto);
  }

  @Delete(':id')
  @SuccessPresenter()
  remove(@Param() { id }: UuidParamValidator) {
    return this.attendanceService.remove(id);
  }
}
