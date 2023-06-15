import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/modules/auth/roles.decorator';
import { RolesGuard } from 'src/modules/auth/roles.guard';
import { Role } from 'src/shared/enums/role.enum';
import { Hospital } from '../entities/hospital.entity';
import { HospitalService } from '../services/hospital.service';

@UseGuards(AuthGuard())
@Controller('hospitais')
export class HospitalController {
  constructor(
    private hospitalService: HospitalService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  @Post()
  async createHospital(@Body() hospital: Hospital): Promise<Hospital> {
    return this.hospitalService.createHospital(hospital);
  }

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @Get()
  async getAllHospitals(): Promise<Hospital[]> {
    return this.hospitalService.getAllHospitals();
  }

  @Get(':id')
  async getHospitalById(@Param('id') id: number): Promise<Hospital> {
    return this.hospitalService.getHospitalById(id);
  }

  @Put(':id')
  async updateHospital(
    @Param('id') id: number,
    @Body() updatedData: Hospital,
  ): Promise<Hospital> {
    return this.hospitalService.updateHospital(id, updatedData);
  }

  @Delete(':id')
  async deleteHospital(@Param('id') id: number): Promise<void> {
    return this.hospitalService.deleteHospital(id);
  }
}
