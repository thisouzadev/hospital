import { Controller, Get, Param } from '@nestjs/common';
import { DoctorService } from '../services/doctor.service';

@Controller('doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Get()
  findAll() {
    return this.doctorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorService.findOne(id);
  }
}
