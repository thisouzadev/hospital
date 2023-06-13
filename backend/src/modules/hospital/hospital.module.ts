import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Hospital } from './entities/hospital.entity';
import { HospitalController } from './controllers/hospital.controller';
import { HospitalService } from './services/hospital.service';
import { HospitalRepository } from './repositories/hospital.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Hospital, HospitalRepository])],
  controllers: [HospitalController],
  providers: [HospitalService],
  exports: [TypeOrmModule],
})
export class HospitalModule {}
