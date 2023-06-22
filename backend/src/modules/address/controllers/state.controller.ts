import { Controller, Get } from '@nestjs/common';
import { StateService } from '../services/state.service';

@Controller('states')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Get()
  findAll() {
    return this.stateService.findAll();
  }
}
