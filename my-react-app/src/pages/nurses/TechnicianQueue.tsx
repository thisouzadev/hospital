import { useQuery } from 'react-query';
import Loading from '../../components/loading';
import { AttendanceStatus, AttendanceType } from '../../types/backend.enums';
import attendanceService from '../../service/attendance.service';
import { Panel } from '../../components/Panel';
import { getDate } from '../../utils/date';
import { ListAttendanceQueryDto } from '../../types/backend.dtos';
import TechnicianQueueTable from './TechnicianQueueTable';

const TechnicianQueue = () => {
  const filters:ListAttendanceQueryDto = {
    attendanceDate: getDate(new Date()),
    // doctorId: get from context
    status: AttendanceStatus.CONFIRMED,
    orderBy: 'confirmedAt',
    orderType: 'DESC',
    take: 50,
  };

  const { data, isLoading } = useQuery({ queryKey: ['attendances', filters], queryFn: () => attendanceService.getAll(filters) });

  if (isLoading) {
    return (
      <Loading />
    );
  }

  const urgencies = data?.result.filter((a) => a.type === AttendanceType.URGENT) || [];
  const priorities = data?.result.filter((a) => a.type === AttendanceType.PRIORITY) || [];
  const standards = data?.result.filter((a) => a.type === AttendanceType.STANDARD) || [];

  return (
    <div>
      <Panel className="mb-3 text-center text-white max-h-10 py-1 text-xl">Fila de Pacientes da Enfermaria</Panel>
      <Panel>
        <TechnicianQueueTable attendances={urgencies} />
        <TechnicianQueueTable attendances={priorities} />
        <TechnicianQueueTable attendances={standards} />
      </Panel>
    </div>
  );
};

export default TechnicianQueue;
