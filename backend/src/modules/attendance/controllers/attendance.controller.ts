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
  Patch,
} from '@nestjs/common';
import { AttendanceService } from '../services/attendance.service';
import { CreateAttendanceDto } from '../dto/create-attendance.dto';
import { UpdateAttendanceDto } from '../dto/update-attendance.dto';
import { UuidParamValidator } from '../../../shared/validators/uuid-param.validator';
import { ListAttendanceQueryDto } from '../dto/list-attendances-query.dto';
import { AuthGuard } from '@nestjs/passport';
import { SuccessPresenter } from '../../../shared/presenters/success-result.presenter';
import { ApiPaginatedResponse } from '../../../shared/decorators/api-paginated-response.decorator';
import { UpdateAttendanceStatusDto } from '../dto/update-status.dto';

// @UseGuards(AuthGuard())
@Controller('Attendances')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  @SuccessPresenter('Atendimento agendado com sucesso')
  create(@Body() createAttendanceDto: CreateAttendanceDto) {
    return this.attendanceService.create(createAttendanceDto);
  }

  @Get()
  @ApiPaginatedResponse()
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

  @Patch(':id/status')
  @SuccessPresenter()
  updateStatus(
    @Param() { id }: UuidParamValidator,
    @Body() { status, type }: UpdateAttendanceStatusDto,
  ) {
    return this.attendanceService.changeStatus(id, status, type);
  }

  @Delete(':id')
  @SuccessPresenter()
  remove(@Param() { id }: UuidParamValidator) {
    return this.attendanceService.remove(id);
  }
}
