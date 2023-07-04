import { Link } from "react-router-dom";
import { PropsWithChildren } from "react";
import AddPatientImg from "../../assets/addPartient.svg";
import PatientsImg from "../../assets/patients.svg";
import ProfileImg from "../../assets/profile.svg";
import BackImg from "../../assets/back.svg";
import ExitImg from "../../assets/exit.svg";
import ScheduleImg from "../../assets/schedule.svg";
import ManageImg from "../../assets/manage.svg";
import AgendaImg from "../../assets/agenda.svg";
import { useEventLogout } from "../../hooks";
import { useAppStore } from "../../store";
import { UserRole } from "../../types/backend.enums";

const HeaderItem = ({ children, to }: PropsWithChildren<{ to: string }>) => (
  <Link to={to} className="hover:drop-shadow-lg transition-shadow">
    {children}
  </Link>
);

const Header = ({ children }: PropsWithChildren) => {
  const onLogout = useEventLogout();
  const [state] = useAppStore();

  const { currentUser } = state;

  const renderHeaderItems = () => {
    if (currentUser?.role === UserRole.Admin) {
      return (
        <>
          <HeaderItem to="/admin/pacientes/cadastrar">
            <img src={AddPatientImg} alt="" />
          </HeaderItem>
          <HeaderItem to="/atendimentos">
            <img src={PatientsImg} alt="" />
          </HeaderItem>
          <HeaderItem to="/admin/agendamentos">
            <img src={ScheduleImg} alt="" />
          </HeaderItem>
          <HeaderItem to="/admin/manage">
            <img src={ManageImg} alt="" />
          </HeaderItem>
          <HeaderItem to="/agenda-medica">
            <img src={AgendaImg} alt="" />
          </HeaderItem>
        </>
      );
    } else if (currentUser?.role === UserRole.Recepcionista) {
      return <></>;
    }
  };
  return (
    <header className="">
      <div className="flex justify-between p-3 m-auto max-w-7xl">
        <div className="flex gap-5 items-center">
          <img src={ProfileImg} alt="" />
          {renderHeaderItems()}
          <div>{children}</div>
        </div>
        <div className="flex gap-5 items-center">
          <HeaderItem to="..">
            <img src={BackImg} alt="" />
          </HeaderItem>
          <button type="button" onClick={onLogout}>
            <img src={ExitImg} alt="" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
