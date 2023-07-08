import { CreateAttendanceDto } from '@modules/attendance/dto/create-attendance.dto';
import { ListAttendanceQueryDto } from '@modules/attendance/dto/list-attendances-query.dto';
import { CreatePatientDto } from '@modules/patient/dto/create-patient.dto';
import { CreateAddressDto } from '@modules/address/dto/create-address.dto';
import { AuthReturnDto } from '@modules/auth/dtos/auth-return.dto';
import { CreateEmployeeDto } from '@modules/employee/dtos/create-employee.dto';
import { CreateDoctorScheduleDto } from '@modules/doctor/dto/create-doctor-schedule.dto';
import { SearchPatientQueryDto } from '@modules/patient/dto/search-patient-query.dto';
import { ListDoctorSchedulesQueryDto } from '@modules/doctor/dto/list-doctor-schedules-query.dto';
import { UpdateAttendanceStatusDto } from '@modules/attendance/dto/update-status.dto';
import { UpdateTechnicianAttendanceDto } from '@modules/attendance/dto/update-technician-attendance.dto';
import { CreateQuickTestDto } from '@modules/quick-test/dtos/create-quick-test.dto';
import { ListQuickTestsQueryDto } from '@modules/quick-test/dtos/list-quick-tests-query.dto';
import { PageDto } from '@shared/dtos/page.dto';

export {
  CreatePatientDto,
  CreateAddressDto,
  CreateAttendanceDto,
  ListAttendanceQueryDto,
  AuthReturnDto,
  CreateEmployeeDto,
  CreateDoctorScheduleDto,
  SearchPatientQueryDto,
  ListDoctorSchedulesQueryDto,
  UpdateAttendanceStatusDto,
  PageDto,
  UpdateTechnicianAttendanceDto,
  CreateQuickTestDto,
  ListQuickTestsQueryDto,
};
