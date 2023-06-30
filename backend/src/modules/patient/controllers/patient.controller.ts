import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { PatientService } from '../services/patient.service';
import { CreatePatientDto } from '../dto/create-patient.dto';
import { UpdatePatientDto } from '../dto/update-patient.dto';
import successResult from '../../../shared/presenters/success-result.presenter';
import { SearchPatientQueryDto } from '../dto/search-patient-query.dto';

@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientService.create(createPatientDto);
  }

  @Get()
  async findAll(@Query() query: SearchPatientQueryDto) {
    return successResult(await this.patientService.findAll(query));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientService.findOne(id);
  }

  @Get('cpf/:cpf')
  findOneByCPF(@Param('cpf') cpf: string) {
    return this.patientService.findOneByCPF(cpf);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientService.update(id, updatePatientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientService.remove(id);
  }
}
