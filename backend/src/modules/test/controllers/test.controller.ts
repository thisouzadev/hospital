import { Controller, Get } from '@nestjs/common';

import { SuccessPresenter } from '../../../shared/presenters/success-result.presenter';
import { TestService } from '../services/test.service';

@Controller('tests')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get()
  @SuccessPresenter()
  findAll() {
    return this.testService.findAll();
  }
}
