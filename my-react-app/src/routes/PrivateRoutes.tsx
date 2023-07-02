import {
  Routes, Route,
} from 'react-router-dom';
import DoctorAttendance from '../pages/doctors/DoctorAttendance';
import CreateDoctorSchedules from '../pages/doctors/CreateDoctorSchedules';
import Welcome from '../pages/Welcome';
import NotFound from '../pages/notFound';

import Management from '../pages/management';
import ListPatients from '../pages/patients/ListPatients';
import ListAttendances from '../pages/attendances/ListAttendances';
import CreateEmployee from '../pages/management/CreateEmployee';
import UpdatePatient from '../pages/patients/UpdatePatient';
import CreatePatient from '../pages/patients/CreatePatient';
import UpdateEmployee from '../pages/management/UpdateEmployee';
import DoctorQueue from '../pages/doctors/DoctorQueue';

// import DocumentsView from '../views/Documents';

/**
 * List of routes available only for authenticated users
 * Also renders the "Private Layout" composition
 */
const PrivateRoutes = () => (
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
    <Route path="/atendimentos" element={<DoctorQueue />} />
    <Route path="/atendimentos/:attendanceId" element={<DoctorAttendance />} />
    <Route path="/admin/agendamentos" element={<ListAttendances />} />
    <Route path="/agenda-medica" element={<CreateDoctorSchedules />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default PrivateRoutes;
