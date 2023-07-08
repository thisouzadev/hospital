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
import { useEventLogout } from '../../hooks';
import { useAppStore } from '../../store';
import { UserRole } from '../../types/backend.enums';
import SectorSelect from './SectorSelect';

interface HeaderItemProps {
  to: To, img:string
}

const HeaderItem = ({ to, img }: HeaderItemProps) => (
  <Link to={to} className="hover:drop-shadow-lg transition-shadow">
    <img src={img} alt="" />
  </Link>
);

const links: Record<UserRole, HeaderItemProps[]> = {
  'administrador de hospital': [],
  'administrador do sistema': [],
  administrador: [
    { to: '/admin/pacientes/cadastrar', img: AddPatientImg },
    { to: '/ambulatorio', img: PatientsImg },
    { to: '/agendamentos', img: ScheduleImg },
    { to: '/admin/manage', img: ManageImg },
    { to: '/agenda-medica', img: AgendaImg },
  ],
  médico: [
    { to: '/ambulatorio', img: PatientsImg },
  ],
  farmaceutico: [],
  recepcionista: [
    { to: '/admin/pacientes/cadastrar', img: AddPatientImg },
    { to: '/agendamentos', img: ScheduleImg },
  ],
};

const RoleLinks = ({ role }:{ role: UserRole }) => (
  <>
    {
      links[role].map((link) => <HeaderItem key={link.img} to={link.to} img={link.img} />)
    }
  </>
);

const Header = ({ children }: PropsWithChildren) => {
  const onLogout = useEventLogout();
  const [state] = useAppStore();

  const navigate = useNavigate();

  const { currentUser } = state;

  const role = currentUser?.role as UserRole;

  return (
    <header className="">
      <div className="flex justify-between p-3 m-auto max-w-7xl">
        <div className="flex gap-5 items-center">
          <HeaderItem to="/" img={ProfileImg} />
          <RoleLinks role={role} />
          <div>{children}</div>
          <SectorSelect />
        </div>
        <div className="flex gap-5 items-center">
          <button type="button" onClick={() => navigate(-1)}>
            <img src={BackImg} alt="" />

          </button>
          <button type="button" onClick={onLogout}>
            <img src={ExitImg} alt="" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
