import { Module } from '@nestjs/common';
import { DoctorService } from './services/doctor.service';
import { DoctorController } from './controllers/doctor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { DoctorScheduleService } from './services/doctor-schedules.service';
import { DoctorSchedule } from './entities/doctor-schedule.entity';
import { DoctorScheduleController } from './controllers/doctor-schedule.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor, DoctorSchedule])],
  controllers: [DoctorController, DoctorScheduleController],
  providers: [DoctorService, DoctorScheduleService],
})
export class DoctorModule {}
