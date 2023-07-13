import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Loading from '../loading';
import attendanceService from '../../service/attendance.service';
import { Panel } from '../Panel';
import { ListAttendanceQueryDto } from '../../types/backend.dtos';
import SectorAttendancesTable from './SectorAttendancesTable';
import { useAppStore } from '../../store';
import { Attendance } from '@/types/backend.models';
import { SectorAttendanceStatus } from '@/types/backend.enums';

interface Props {
  onSelectAttendance?: (attendance: Attendance) => void
}
const SectorAttendances = ({ onSelectAttendance }:Props) => {
  const [state] = useAppStore();

  const navigate = useNavigate();

  const openAttendance = (attendance: Attendance) => {
    navigate(`/atendimento/${attendance.attendanceId}`);
  };

  const sectorId = state.currentSector?.sectorId as string;

  const filters:ListAttendanceQueryDto = {
    // attendanceDate: getDate(new Date()),
    // doctorId: get from context
    // status: AttendanceStatus.CONFIRMED,

    sectorAttendanceStatus: SectorAttendanceStatus.WAITING,

    orderBy: 'confirmedAt',
    orderType: 'DESC',
    sectorId,
    take: 50,
    page: 1,
  };

  const { data, isLoading } = useQuery({ queryKey: ['attendances', filters, sectorId], queryFn: () => attendanceService.getAll(filters) });

  if (isLoading) {
    return (
      <Loading />
    );
  }

  return (
    <div>
      <Panel className="mb-3 text-center text-white max-h-10 py-1 text-xl">
        {`Fila de Pacientes Setor: ${state.currentSector?.name.toUpperCase()}`}
      </Panel>
      <Panel>
        <SectorAttendancesTable
          attendances={data?.result || []}
          onSelectAttendance={onSelectAttendance || openAttendance}
        />

      </Panel>
    </div>
  );
};

export default SectorAttendances;
