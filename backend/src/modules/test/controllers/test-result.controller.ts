import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiPaginatedResponse } from '../../../shared/decorators/api-paginated-response.decorator';

import { SuccessPresenter } from '../../../shared/presenters/success-result.presenter';
import { CreateTestResultDto } from '../dtos/create-test-result.dto';
import { ListTestResultsQueryDto } from '../dtos/list-test-results-query.dto';
import { TestResultService } from '../services/test-result.service';

@UseGuards(AuthGuard('jwt'))
@Controller('test-results')
export class TestResultController {
  constructor(private readonly testResultService: TestResultService) {}

  @Post()
  @SuccessPresenter()
  create(@Body() createTestResultDto: CreateTestResultDto, @Req() req: any) {
    return this.testResultService.create(
      req.user.employee.employeeId,
      createTestResultDto,
    );
  }

  @Get()
  @ApiPaginatedResponse()
  findAll(@Query() query: ListTestResultsQueryDto) {
    return this.testResultService.findAll(query);
  }
}
