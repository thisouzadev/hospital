import { useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../loading';
import { AttendanceStatus } from '../../types/backend.enums';
import { Attendance } from '../../types/backend.models';
import { getDate } from '../../utils/date';
import attendanceService from '../../service/attendance.service';
import { ListAttendanceQueryDto } from '../../types/backend.dtos';
import AttendancesTable from './AttendanceTable';

interface AttendancesProps {
  onSelectAttendance?: (attendance:Attendance) => void

}

function Attendances({ onSelectAttendance = () => {} }:AttendancesProps) {
  const [filters, setFilters] = useState<ListAttendanceQueryDto>(
    { attendanceDate: getDate(new Date()) },
  );

  const { data, isLoading } = useQuery({ queryKey: ['attendances', filters], queryFn: () => attendanceService.getAll(filters) });

  const [selectedAttendanceId, setSelectedAttendanceId] = useState('');

  const handleChangeFilter = (e:any) => {
    const filterName = e.target.name;
    const filterValue = e.target.value;

    setFilters((prev) => ({ ...prev, [filterName]: filterValue }));
  };

  const handleChangePage = (direction: 1 | -1) => {
    if (!data) {
      return;
    }
    const newPage = data.meta.page + direction;
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const handleSelectAttendance = (attendance: Attendance) => {
    setSelectedAttendanceId(attendance.attendanceId);
    onSelectAttendance(attendance);
  };

  return (
    <div>
      <div className="flex items-center justify-evenly h-11 bg-[#D9D9D9] rounded-lg border-2 border-blue-400 group-hover:bg-[#f3f2f2] text-lg">
        <div>
          <span>{'Pacientes do dia:  '}</span>
          <input name="attendanceDate" type="date" value={filters.attendanceDate} onChange={handleChangeFilter} className="bg-transparent" />
        </div>
        <div>
          <label htmlFor="status">
            <span>Status:</span>
            <select name="status" className="bg-transparent w-52" value={filters.status} onChange={handleChangeFilter}>
              <option value="">TODOS</option>
              {
              Object.values(AttendanceStatus).map((status) => (
                <option key={status} value={status}>{status.toUpperCase()}</option>
              ))
            }
            </select>
          </label>
        </div>
      </div>
      {
        isLoading
          ? <Loading />
          : (
            <AttendancesTable
              attendances={data?.result || []}
              onSelectAttendance={handleSelectAttendance}
              selectedAttendanceId={selectedAttendanceId}
            />
          )
      }
      <div className="flex items-center justify-center gap-10 h-11 bg-[#D9D9D9] rounded-lg border-2 border-blue-400 group-hover:bg-[#f3f2f2] text-lg">
        <button type="button" disabled={!data?.meta.hasPreviousPage} onClick={() => handleChangePage(-1)}>Anterior</button>
        {`${data?.meta.page}/${data?.meta.pageCount}`}
        <button type="button" disabled={!data?.meta.hasNextPage} onClick={() => handleChangePage(1)}>Seguinte</button>
      </div>
    </div>
  );
}

export default Attendances;
