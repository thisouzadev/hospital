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
import { CreateQuickTestDto } from '../dtos/create-quick-test.dto';
import { ListQuickTestsQueryDto } from '../dtos/list-quick-tests-query.dto';
import { QuickTestService } from '../services/test-result.service';

@UseGuards(AuthGuard('jwt'))
@Controller('quick-tests')
export class TestResultController {
  constructor(private readonly quickTestService: QuickTestService) {}

  @Post()
  @SuccessPresenter()
  create(@Body() createTestResultDto: CreateQuickTestDto, @Req() req: any) {
    return this.quickTestService.create(
      req.user.employee.employeeId,
      createTestResultDto,
    );
  }

  @Get()
  @ApiPaginatedResponse()
  findAll(@Query() query: ListQuickTestsQueryDto) {
    return this.quickTestService.findAll(query);
  }
}
