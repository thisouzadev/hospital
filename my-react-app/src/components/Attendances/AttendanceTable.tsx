import clsx from 'clsx';
import { PropsWithChildren, useState } from 'react';

import { AttendanceStatus, AttendanceType } from '../../types/backend.enums';
import scheduleImg from '../../assets/schedule2.svg';
import patientImg from '../../assets/receivePatient.svg';
import DeleteImg from '../../assets/delete.svg';
import QueueImg from '../../assets/queue.svg';
import { Attendance } from '../../types/backend.models';
import ConfirmationModal from './ConfirmationModal';

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

interface UpdateAttendance {
  attendanceId:string,
  status?: AttendanceStatus,
  type?: AttendanceType,
}
interface AttendanceTableProps {
  onSelectAttendance?: (attendance:Attendance) => void
  attendances: Attendance[],
  selectedAttendanceId: string
  onChangeStatus?: (data:UpdateAttendance) => void
}

const AttendancesTable = (
  {
    attendances,
    selectedAttendanceId,
    onSelectAttendance = () => {},
    onChangeStatus = () => {},
  }:AttendanceTableProps,
) => {
  const [selectedAttendance, setSelectedAttendance] = useState<Attendance>();

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const handleCancel = (attendance:Attendance) => {
    if (!window.confirm(`Deseja realmente CANCELAR a consulta de ${attendance.patient.name}?`)) {
      return;
    }
    onChangeStatus({ attendanceId: attendance.attendanceId, status: AttendanceStatus.CANCELED });
  };

  const handleConfirmPatient = ({ type, sectorId }: { type:AttendanceType, sectorId:string }) => {
    if (!selectedAttendance) {
      return;
    }
    onChangeStatus({
      attendanceId: selectedAttendance.attendanceId,
      status: selectedAttendance.status === AttendanceStatus.CONFIRMED
        ? undefined
        : AttendanceStatus.CONFIRMED,
      type,
    });
  };

  const handleConfirm = (attendance:Attendance) => {
    setSelectedAttendance(attendance);
    setIsConfirmationOpen(true);
  };

  return (
    <div>
      <ConfirmationModal
        isOpen={isConfirmationOpen}
        setIsOpen={setIsConfirmationOpen}
        attendance={selectedAttendance as Attendance}
      />
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
              Atendimento
            </Cell>
            <Cell>
              Status
            </Cell>
            <Cell>
              Tipo
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
              <button
                type="button"
                title="Confirmar chegada do paciente"
                onClick={() => handleConfirm(attendance)}
                disabled={!(attendance.status === AttendanceStatus.SCHEDULED)}
                className="disabled:grayscale disabled:opacity-25"
              >
                <img src={patientImg} className="w-8 m-auto" alt="" />
              </button>
              <button
                type="button"
                title="Alterar dados do atendimento"
                onClick={() => handleConfirm(attendance)}
                disabled={!(attendance.status === AttendanceStatus.CONFIRMED)}
                className="disabled:grayscale disabled:opacity-25"
              >
                <img src={QueueImg} className="w-8 m-auto" alt="" />
              </button>
              <button
                type="button"
                title="Cancelar o atendimento"
                onClick={() => handleCancel(attendance)}
                disabled={
                  attendance.status === AttendanceStatus.CANCELED
                   || attendance.status === AttendanceStatus.FINISHED
                }
                className="disabled:grayscale disabled:opacity-25"
              >
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
          <Cell className={clsx(
            'font-bold',
            { 'bg-red-300': attendance.type === AttendanceType.URGENT },
            { 'bg-yellow-300': attendance.type === AttendanceType.PRIORITY },
            { 'bg-green-300': attendance.type === AttendanceType.STANDARD },
            // { 'text-blue-600': attendance.status === AttendanceStatus.FINISHED },
          )}
          />
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
