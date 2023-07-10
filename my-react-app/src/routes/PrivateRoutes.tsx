import {
  Routes, Route, Navigate,
} from 'react-router-dom';
import MedicalAttendance from '../pages/MedicalAttendance';
import CreateDoctorSchedules from '../pages/admin/CreateDoctorSchedules';
import Welcome from '../pages/Welcome';
import NotFound from '../pages/notFound';

import Management from '../pages/management';
import ListPatients from '../pages/patients/ListPatients';
import ListAttendances from '../pages/attendances/ListAttendances';
import CreateEmployee from '../pages/management/CreateEmployee';
import UpdatePatient from '../pages/patients/UpdatePatient';
import CreatePatient from '../pages/patients/CreatePatient';
import UpdateEmployee from '../pages/management/UpdateEmployee';
import ListAttendancesAdmin from '../pages/admin/Attendances';
import { UserRole } from '../types/backend.enums';
import SectorAttendances from '../components/SectorAttendances';

const Attendance = ({ role }:{ role: UserRole }) => {
  switch (role) {
    case UserRole.Technician:
    case UserRole.Farmaceutico:
    case UserRole.Enfermeiro:
    case UserRole.Medico:
      return <MedicalAttendance />;

    default:
      return <Navigate to="/" />;
  }
};

interface Props {
  role: UserRole
}
/**
 * List of routes available only for authenticated users
 * Also renders the "Private Layout" composition
 */
const PrivateRoutes = ({ role }:Props) => (
  <Routes>
    <Route path="/" element={<Welcome />} />
    <Route path="/admin/manage" element={<Management />} />
    <Route path="/admin/pacientes/cadastrar" element={<CreatePatient />} />
    <Route path="/admin/manage/cadastrar" element={<CreateEmployee />} />
    <Route
      path="/admin/manage/editar/:employeeId"
      element={<UpdateEmployee />}
    />
    <Route
      path="/admin/pacientes/detalhes/:patientId"
      element={<UpdatePatient />}
    />
    <Route path="/admin/pacientes" element={<ListPatients />} />
    <Route path="/admin/atendimentos" element={<ListAttendancesAdmin />} />

    <Route path="/agendamentos" element={<ListAttendances />} />
    <Route path="/agenda-medica" element={<CreateDoctorSchedules />} />

    <Route path="/atendimento" element={<SectorAttendances />} />
    <Route path="/atendimento/:attendanceId" element={<Attendance role={role} />} />

    {/* <EmployeeRoutes role={role} /> */}

    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default PrivateRoutes;
