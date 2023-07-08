import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { SuccessPresenter } from '../../../shared/presenters/success-result.presenter';
import { AuthGuard } from '@nestjs/passport';
import { SectorAttendanceService } from '../services/sector-attendance.service';
import { SectorAttendanceDto } from '../dto/enter-attendance.dto';
import { MoveSectorDto } from '../dto/move-sector.dto';

@Controller('sector-attendances')
@UseGuards(AuthGuard('jwt'))
export class SectorAttendancesController {
  constructor(private readonly sectorService: SectorAttendanceService) {}

  @Post('/enter')
  @SuccessPresenter()
  enter(@Body() enterSectorDto: SectorAttendanceDto) {
    return this.sectorService.enterSector(enterSectorDto);
  }

  @Post('/left')
  @SuccessPresenter()
  left(@Body() leftSectorDto: SectorAttendanceDto) {
    return this.sectorService.leftSector(leftSectorDto);
  }

  @Post('/move')
  @SuccessPresenter()
  move(@Body() moveSectorDto: MoveSectorDto) {
    return this.sectorService.moveSector(moveSectorDto);
  }

  @Post('/attend')
  @SuccessPresenter()
  attend(@Body() leftSectorDto: SectorAttendanceDto) {
    return this.sectorService.startAttendance(leftSectorDto);
  }
}
