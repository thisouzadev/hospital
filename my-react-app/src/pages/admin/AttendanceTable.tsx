import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { Link } from 'react-router-dom';
import { AttendanceStatus } from '../../types/backend.enums';
import DetailsImg from '../../assets/details.svg';

import { Attendance } from '../../types/backend.models';
import { isoToString } from '../../utils/date';

const Cell = ({ children, className }: PropsWithChildren<{ className?: string }>) => (
  <div className={
    clsx(
      'bg-[#f0f0f0] rounded-lg ring-1 ring-blue-400 group-hover:bg-[#e7e6e6] p-0 text-center py-0 flex justify-center items-center h-10',
      className,
    )
  }
  >
    {children}
  </div>
);

interface AttendanceTableProps {
  onSelectAttendance?: (attendance:Attendance) => void
  attendances: Attendance[],
  forPrint? : boolean
}

const AttendancesTable = (
  {
    attendances,
    onSelectAttendance = () => {},
    forPrint = false,
  }:AttendanceTableProps,
) => (
  <div className={clsx('max-h-[500px] mt-2 ', { 'max-h-none': forPrint })}>
    <div className="w-full">
      <div className="font-bold grid grid-cols-12 w-full pr-4 gap-1">
        <Cell className="col-span-4">
          Paciente
        </Cell>
        <Cell className="col-span-2">
          Especialidade
        </Cell>
        <Cell className="col-span-2">
          Nº Atendimento
        </Cell>
        <Cell className="col-span-1">
          Atendido
        </Cell>
        <Cell className="col-span-2">
          Data:
        </Cell>
        <Cell className="border-none invisible">
          <img src={DetailsImg} className="w-8 m-auto" alt="" />
        </Cell>
      </div>
    </div>
    <div className={clsx('overflow-y-auto max-h-[450px] mt-2 ', { 'max-h-none': forPrint })}>
      {
          attendances.map((attendance) => (
            <div key={attendance.attendanceId} className="grid grid-cols-12 w-full group gap-1 mb-1 border-1 border-blue-400 rounded-lg box-border">
              <Cell className="col-span-4">
                {attendance.patient.name}
              </Cell>
              <Cell className="col-span-2">
                {attendance.doctor.specialty}
              </Cell>
              <Cell className="col-span-2">
                {attendance.attendanceNumber}
              </Cell>
              <Cell>
                {attendance.status === AttendanceStatus.FINISHED ? 'Sim' : 'Não'}
              </Cell>
              <Cell className="col-span-2">
                {isoToString(attendance.attendanceDate)}
              </Cell>

              <Cell className="ring-0">
                <Link to={`/admin/pacientes/detalhes/${attendance.patientId}`}>
                  <button type="button" onClick={() => onSelectAttendance(attendance)} title="Dados do Paciente">
                    <img src={DetailsImg} className="w-8 m-auto" alt="" />
                  </button>
                </Link>
              </Cell>
            </div>
          ))
        }
    </div>

  </div>
);

export default AttendancesTable;
