import { Controller, Get, Param } from '@nestjs/common';
import successResult from '../../../shared/presenters/success-result.presenter';
import { DoctorService } from '../services/doctor.service';

@Controller('doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Get()
  async findAll() {
    return successResult(await this.doctorService.findAll());
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return successResult(await this.doctorService.findOne(id));
  }
}
