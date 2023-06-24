import { Link } from 'react-router-dom';
import AddPatientImg from '../../assets/addPartient.svg';
import PatientsImg from '../../assets/patients.svg';
import ProfileImg from '../../assets/profile.svg';
import BackImg from '../../assets/back.svg';
import ExitImg from '../../assets/exit.svg';
import ScheduleImg from '../../assets/schedule.svg';
import ManageImg from '../../assets/manage.svg';
import { useEventLogout } from '../../hooks';

const Header = () => {
  const onLogout = useEventLogout();
  return (
    <header className="">
      <div className="flex justify-between p-3 m-auto max-w-7xl">
        <div className="flex gap-5">
          <img src={ProfileImg} alt="" />
          <Link to="/admin/pacientes/cadastrar">
            <img src={AddPatientImg} alt="" />
          </Link>
          <Link to="/admin/pacientes">
            <img src={PatientsImg} alt="" />
          </Link>
          <Link to="/admin/agendamentos">
            <img src={ScheduleImg} alt="" />
          </Link>
          <Link to="/admin/manage">
            <img src={ManageImg} alt="" />
          </Link>
        </div>
        <div className="flex gap-5">
          <Link to="..">
            <img src={BackImg} alt="" />
          </Link>
          <button type="button" onClick={onLogout}>
            <img src={ExitImg} alt="" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
