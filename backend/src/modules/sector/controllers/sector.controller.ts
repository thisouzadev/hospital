import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { SectorService } from '../services/sector.service';
import { CreateSectorDto } from '../dto/create-sector.dto';
import { UpdateSectorDto } from '../dto/update-sector.dto';
import { UserHospital } from '../../../shared/decorators/user-hospital.decorator';
import { UuidParamValidator } from '../../../shared/validators/uuid-param.validator';
import { SuccessPresenter } from '../../../shared/presenters/success-result.presenter';
import { AuthGuard } from '@nestjs/passport';

@Controller('sectors')
@UseGuards(AuthGuard('jwt'))
export class SectorController {
  constructor(private readonly sectorService: SectorService) {}

  @Post()
  @SuccessPresenter()
  create(
    @UserHospital() hospitalId: string,
    @Body() createSectorDto: CreateSectorDto,
  ) {
    return this.sectorService.create(hospitalId, createSectorDto);
  }

  @Get()
  @SuccessPresenter()
  findAll(@UserHospital() hospitalId: string) {
    return this.sectorService.findAll(hospitalId);
  }

  @Get(':id')
  @SuccessPresenter()
  findOne(
    @UserHospital() hospitalId: string,
    @Param() { id }: UuidParamValidator,
  ) {
    return this.sectorService.findOne(hospitalId, id);
  }

  @Delete(':id')
  @SuccessPresenter()
  delete(
    @UserHospital() hospitalId: string,
    @Param() { id }: UuidParamValidator,
  ) {
    return this.sectorService.remove(hospitalId, id);
  }

  @Put(':id')
  @SuccessPresenter()
  update(
    @UserHospital() hospitalId: string,
    @Param() { id }: UuidParamValidator,
    @Body() updateSectorDto: UpdateSectorDto,
  ) {
    return this.sectorService.update(hospitalId, id, updateSectorDto);
  }
}
