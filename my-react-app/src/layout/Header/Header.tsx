import { Link, To, useNavigate } from 'react-router-dom';
import { PropsWithChildren } from 'react';
import AddPatientImg from '../../assets/addPatient.svg';
import PatientsImg from '../../assets/patients.svg';
import ProfileImg from '../../assets/profile.svg';
import BackImg from '../../assets/back.svg';
import ExitImg from '../../assets/exit.svg';
import ScheduleImg from '../../assets/schedule.svg';
import ManageImg from '../../assets/manage.svg';
import AgendaImg from '../../assets/agenda.svg';
import AttendanceListImg from '../../assets/attendanceList.svg';
import HospitalImg from '../../assets/hospital.svg';
import { useEventLogout } from '../../hooks';
import { useAppStore } from '../../store';
import { UserRole } from '../../types/backend.enums';
import SectorSelect from './SectorSelect';
import RoleSelect from './RoleSelect';

import DepartmentsImg from '../../assets/departments.svg';

interface HeaderItemProps {
  to: To, img:string, title?:string
}

const HeaderItem = ({ to, img, title }: HeaderItemProps) => (
  <Link to={to} className="hover:drop-shadow-lg transition-shadow w-16">
    <img src={img} alt="" title={title} />
  </Link>
);

const links: Record<UserRole, HeaderItemProps[]> = {
  'administrador de hospital': [],
  'administrador do sistema': [
    { to: '/super-admin/hospitais', img: HospitalImg, title: 'Hospitais' },
    { to: '/admin/manage', img: ManageImg, title: 'Funcionários' },

  ],
  administrador: [
    // { to: '/admin/pacientes/cadastrar', img: AddPatientImg },
    // { to: '/atendimento', img: PatientsImg, title: 'Fila de atendimentos' },
    // { to: '/agendamentos', img: ScheduleImg, title: 'Agendar atendimentos' },
    { to: '/admin/atendimentos', img: AttendanceListImg, title: 'Listar os atendimentos' },
    { to: '/admin/manage', img: ManageImg, title: 'Funcionários' },
    { to: '/agenda-medica', img: AgendaImg, title: 'Agenda dos médicos' },
    { to: '/admin/setores', img: DepartmentsImg, title: 'Setores da unidade' },
  ],
  médico: [
    { to: '/atendimento', img: PatientsImg, title: 'Fila de atendimentos' },
  ],
  farmaceutico: [
    { to: '/atendimento', img: PatientsImg, title: 'Fila de atendimentos' },
  ],
  recepcionista: [
    { to: '/admin/pacientes/cadastrar', img: AddPatientImg, title: 'Cadastro de pacientes' },
    { to: '/agendamentos', img: ScheduleImg, title: 'Agendar atendimentos' },
  ],
  'técnico em enfermagem': [
    { to: '/atendimento', img: PatientsImg, title: 'Fila de atendimentos' }],
  enfermeiro: [
    { to: '/atendimento', img: PatientsImg, title: 'Fila de atendimentos' },

  ],
};

const RoleLinks = ({ role }:{ role: UserRole }) => (
  <>
    {
      links[role].map((link) => (
        <HeaderItem
          key={link.img}
          to={link.to}
          img={link.img}
          title={link.title}
        />
      ))
    }
  </>
);

const Header = ({ children }: PropsWithChildren) => {
  const onLogout = useEventLogout();

  const [state] = useAppStore();

  const navigate = useNavigate();

  const { currentUser, currentHospital } = state;

  const role = currentUser?.role as UserRole;

  const debugMode = import.meta.env.VITE_DEBUG_MODE === 'true';

  return (
    <header className="">
      <div className="flex justify-between p-3 m-auto max-w-7xl">
        <div className="flex gap-5 items-center">
          <HeaderItem to="/" img={ProfileImg} />
          <RoleLinks role={role} />
          <div>{children}</div>

        </div>
        <div className="flex gap-5 items-center">
          {debugMode
            && (
            <div className="flex flex-col bg-[#ffffff20] px-2 rounded-md shadow-sm">
              <span>{currentUser?.employee?.name}</span>
              <RoleSelect />
              <span>{currentHospital?.hospitalName}</span>
            </div>
            )}
          {debugMode
          && <SectorSelect />}
          <button type="button" onClick={() => navigate(-1)} className="w-20 h-20">
            <img src={BackImg} alt="" />
          </button>
          <button type="button" onClick={onLogout} className="w-20">
            <img src={ExitImg} alt="" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
