import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/modules/auth/roles.decorator';
import { RolesGuard } from '../../../modules/auth/roles.guard';
import { UserRole } from '../../../shared/enums/user-role.enum';
import { SuccessPresenter } from '../../../shared/presenters/success-result.presenter';
import { UuidParamValidator } from '../../../shared/validators/uuid-param.validator';

import { CreateHospitalDto } from '../dtos/create-hospital.dto';
import { UpdateHospitalDto } from '../dtos/update-hospital.dto';
import { Hospital } from '../entities/hospital.entity';
import { HospitalService } from '../services/hospital.service';

@Controller('hospitals')
@Roles(UserRole.SuperAdmin)
@UseGuards(RolesGuard)
@UseGuards(AuthGuard('jwt'))
export class HospitalController {
  constructor(
    private hospitalService: HospitalService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  @Post()
  @SuccessPresenter()
  async createHospital(@Body() hospital: CreateHospitalDto): Promise<Hospital> {
    return this.hospitalService.createHospital(hospital);
  }

  @Get()
  @SuccessPresenter()
  async getAllHospitals(): Promise<Hospital[]> {
    return this.hospitalService.getAllHospitals();
  }

  @Get(':id')
  @SuccessPresenter()
  async getHospitalById(
    @Param() { id }: UuidParamValidator,
  ): Promise<Hospital> {
    return this.hospitalService.getHospitalById(id);
  }

  @Put(':id')
  @SuccessPresenter()
  async updateHospital(
    @Param() { id }: UuidParamValidator,
    @Body() updatedData: UpdateHospitalDto,
  ): Promise<Hospital> {
    return this.hospitalService.updateHospital(id, updatedData);
  }

  @Delete(':id')
  @SuccessPresenter()
  async deleteHospital(@Param() { id }: UuidParamValidator): Promise<void> {
    return this.hospitalService.deleteHospital(id);
  }
}
