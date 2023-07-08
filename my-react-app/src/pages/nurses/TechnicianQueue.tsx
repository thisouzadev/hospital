import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/loading';
import { AttendanceStatus, AttendanceType } from '../../types/backend.enums';
import attendanceService from '../../service/attendance.service';
import { Panel } from '../../components/Panel';
import { getDate } from '../../utils/date';
import { ListAttendanceQueryDto } from '../../types/backend.dtos';
import TechnicianQueueTable from './TechnicianQueueTable';
import { useAppStore } from '../../store';
import SectorAttendances from '../../components/SectorAttendances';

const TechnicianQueue = () => {
  const navigate = useNavigate();

  return <SectorAttendances onSelectAttendance={(attendance) => { navigate(`/enfermaria/${attendance.attendanceId}`); }} />;

  const [state] = useAppStore();

  const filters:ListAttendanceQueryDto = {
    attendanceDate: getDate(new Date()),
    // doctorId: get from context
    status: AttendanceStatus.CONFIRMED,
    orderBy: 'confirmedAt',
    orderType: 'DESC',
    take: 50,
  };

  const { data, isLoading } = useQuery({ queryKey: ['attendances', filters], queryFn: () => attendanceService.getAll(filters) });

  const urgencies = data?.result.filter((a) => a.type === AttendanceType.URGENT) || [];
  const priorities = data?.result.filter((a) => a.type === AttendanceType.PRIORITY) || [];
  const standards = data?.result.filter((a) => a.type === AttendanceType.STANDARD) || [];

  if (isLoading) {
    return (
      <Loading />
    );
  }

  return (
    <div>
      <Panel className="mb-3 text-center text-white max-h-10 py-1 text-xl">
        Fila de Pacientes da
        {' '}
        {state.currentSector?.name}
      </Panel>
      <Panel>
        <TechnicianQueueTable attendances={urgencies} />
        <TechnicianQueueTable attendances={priorities} />
        <TechnicianQueueTable attendances={standards} />
      </Panel>
    </div>
  );
};

export default TechnicianQueue;
