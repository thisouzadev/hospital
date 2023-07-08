import { Module } from '@nestjs/common';
import { SectorService } from './services/sector.service';
import { SectorController } from './controllers/sector.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sector } from './entities/sector.entity';
import { AuthModule } from '../auth/auth.module';
import { SectorAttendancesController } from './controllers/sector-attendances.controller';
import { SectorAttendanceService } from './services/sector-attendance.service';
import { SectorAttendance } from './entities/sector-attendance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sector, SectorAttendance]), AuthModule],
  controllers: [SectorController, SectorAttendancesController],
  providers: [SectorService, SectorAttendanceService],
})
export class SectorModule {}
