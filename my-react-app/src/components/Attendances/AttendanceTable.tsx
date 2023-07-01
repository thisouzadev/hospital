import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { AttendanceStatus } from '../../types/backend.enums';
import scheduleImg from '../../assets/schedule2.svg';
import patientImg from '../../assets/receivePatient.svg';
import DeleteImg from '../../assets/delete.svg';

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
  onChangeStatus?: (attendanceId:string, status: AttendanceStatus) => void
}

const AttendancesTable = (
  {
    attendances,
    selectedAttendanceId,
    onSelectAttendance = () => {},
    onChangeStatus = () => {},
  }:AttendanceTableProps,
) => {
  const handleCancel = (attendance:Attendance) => {
    if (!window.confirm(`Deseja realmente CANCELAR a consulta de ${attendance.patient.name}?`)) {
      return;
    }
    onChangeStatus(attendance.attendanceId, AttendanceStatus.CANCELED);
  };

  const handleConfirm = (attendance:Attendance) => {
    if (!window.confirm(`Deseja CONFIRMAR a chegada de ${attendance.patient.name}?`)) {
      return;
    }
    onChangeStatus(attendance.attendanceId, AttendanceStatus.CONFIRMED);
  };

  return (
    <div>

      <table className="w-full text-center align-middle border-spacing-y-1 border-separate">
        <thead>
          <tr className="h-10 font-bold">
            <Cell className="border-none">
              Ações
            </Cell>

            <Cell className="w-1/3">
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

          <Cell className="border-none">
            <div className="flex gap-4 justify-center">
              <button type="button" title="Confirmar chegada do paciente" onClick={() => handleConfirm(attendance)}>
                <img src={patientImg} className="w-8 m-auto" alt="" />
              </button>
              <button type="button" title="Cancelar o atendimento" onClick={() => handleCancel(attendance)}>
                <img src={DeleteImg} className="w-8 m-auto" alt="" />
              </button>
            </div>
          </Cell>
          <Cell className="w-1/3">
            {attendance.patient.name}
          </Cell>
          <Cell className="w-1/4">
            <input type="date" value={attendance.patient.birth} className="bg-transparent text-center" disabled />
          </Cell>
          <Cell>
            {attendance.attendanceNumber}
          </Cell>
          <Cell className={clsx(
            'font-bold',
            { 'text-red-600': attendance.status === AttendanceStatus.CANCELED },
            { 'text-green-600': attendance.status === AttendanceStatus.SCHEDULED },
            { 'text-blue-600': attendance.status === AttendanceStatus.CONFIRMED },
            // { 'text-blue-600': attendance.status === AttendanceStatus.FINISHED },
          )}
          >
            {attendance.status}
          </Cell>
          <Cell className="border-none">
            <button type="button" onClick={() => onSelectAttendance(attendance)} title="Selecionar">
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
};

export default AttendancesTable;
