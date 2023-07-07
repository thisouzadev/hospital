import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { HospitalModule } from './modules/hospital/hospital.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from './config/config.schema';
import { UserModule } from './modules/user/user.module';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { EmployeeModule } from './modules/employee/employee.module';
import { AddressModule } from './modules/address/address.module';
import { DoctorModule } from './modules/doctor/doctor.module';
import { PatientModule } from './modules/patient/patient.module';
import { AttendanceModule } from './modules/attendance/attendance.module';
import { QuickTestModule } from './modules/quick-test/quick-test.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env`],
      validationSchema: configValidationSchema,
      cache: true,
    }),

    AddressModule,
    EmployeeModule,
    HospitalModule,
    AuthModule,
    UserModule,
    DoctorModule,
    PatientModule,
    AttendanceModule,
    QuickTestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
