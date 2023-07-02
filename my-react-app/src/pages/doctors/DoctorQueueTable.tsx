import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { AttendanceType } from '../../types/backend.enums';
import patientImg from '../../assets/receivePatient.svg';
import ForwardImg from '../../assets/forward.svg';

import { Attendance } from '../../types/backend.models';

const Cell = ({ children, className }: PropsWithChildren<{ className?: string }>) => (
  <td className={
    clsx(
      'h-11 rounded-lg border-2 border-blue-400 ',
      className,
    )
  }
  >
    {children}
  </td>
);

interface DoctorQueueTableProps {
  attendances: Attendance[],
}

const DoctorQueueTable = (
  {
    attendances,

  }:DoctorQueueTableProps,
) => (
  <div>

    <table className="w-full text-center align-middle border-spacing-y-1 border-separate">

      <tbody className="">
        {
          attendances.map((attendance, index) => (
            <tr
              key={attendance.attendanceId}
              className={
            clsx(
              'h-10 rounded-lg',
              { 'bg-red-300': attendance.type === AttendanceType.URGENT },
              { 'bg-yellow-300': attendance.type === AttendanceType.PRIORITY },
              { 'bg-green-300': attendance.type === AttendanceType.STANDARD },
            )
          }
            >
              <Cell className="w-1/3">
                {attendance.patient.name}
              </Cell>
              <Cell className="w-1/4">
                <input type="date" value={attendance.patient.birth} className="bg-transparent text-center" disabled />
              </Cell>

              <Cell>
                {attendance.status}
              </Cell>
              <Cell className="border-none bg-[#D9D9D9] ">
                <div className="flex gap-4 justify-center">
                  <button type="button" title="Atender o paciente">
                    <img src={patientImg} className="w-8 m-auto" alt="" />
                  </button>
                  <button type="button" title="Encaminhar">
                    <img src={ForwardImg} className="w-8 m-auto" alt="" />
                  </button>
                </div>
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

export default DoctorQueueTable;
