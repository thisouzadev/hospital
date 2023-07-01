import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import scheduleImg from '../../assets/schedule2.svg';
import { Attendance } from '../../types/backend.models';

const Cell = ({ children, className }: PropsWithChildren<{ className?: string }>) => (
  <td className={
    clsx(
      'h-11 bg-[#D9D9D9] rounded-lg border-2 border-blue-400 group-hover:bg-[#f3f2f2]',
      className,
    )
  }
  >
    {children}
  </td>
);

interface AttendanceTableProps {
  onSelectAttendance?: (attendance:Attendance) => void
  attendances: Attendance[],
  selectedAttendanceId: string
}

const AttendancesTable = (
  {
    attendances,
    selectedAttendanceId,
    onSelectAttendance = () => {},
  }:AttendanceTableProps,
) => (
  <div>

    <table className="w-full text-center align-middle border-spacing-y-1 border-separate">
      <thead>
        <tr className="h-10 group font-bold">
          <Cell className="w-1/2">
            Nome
          </Cell>
          <Cell className="w-1/4">
            Nascimento
          </Cell>
          <Cell>
            No atendimento:
          </Cell>
          <Cell>
            Status:
          </Cell>
          <Cell className="border-none invisible">
            <img src={scheduleImg} className="w-8 m-auto" alt="" />
          </Cell>
        </tr>
      </thead>
      <tbody className="">
        {
      attendances.map((attendance) => (
        <tr key={attendance.attendanceId} className={clsx('h-10 group rounded-lg', { 'ring-orange-700 ring-2': selectedAttendanceId === attendance.attendanceId })}>
          <Cell className="w-1/2">
            {attendance.patient.name}
          </Cell>
          <Cell className="w-1/4">
            <input type="date" value={attendance.patient.birth} className="bg-transparent text-center" disabled />
          </Cell>
          <Cell>
            {attendance.attendanceNumber}
          </Cell>
          <Cell>
            {attendance.status}
          </Cell>
          <Cell className="border-none">
            <button type="button" onClick={() => onSelectAttendance(attendance)}>
              <img src={scheduleImg} className="w-8 m-auto" alt="" />
            </button>
          </Cell>
        </tr>
      ))
}
      </tbody>
    </table>
    {attendances.length === 0
    && (
      <div className="text-center font-bold w-full">
        Nenhum atendimento encontrado
      </div>
    )}
  </div>
);

export default AttendancesTable;
