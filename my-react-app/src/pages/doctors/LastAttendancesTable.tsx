import clsx from 'clsx';
import { PropsWithChildren } from 'react';

import { Link } from 'react-router-dom';
import { AttendanceType } from '../../types/backend.enums';
import patientImg from '../../assets/receivePatient.svg';

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

interface LastAttendancesTableProps {
  attendances: Attendance[],
}

const LastAttendancesTable = (
  {
    attendances,

  }:LastAttendancesTableProps,
) => (
  <div>

    <table className="w-full text-center align-middle border-spacing-y-1 border-separate">

      <tbody className="">
        {
          attendances.map((attendance) => (
            <tr
              key={attendance.attendanceId}
              className=" bg-[#D9D9D9] "
            >
              <Cell className="w-1/5">
                <input type="date" value={attendance.attendanceDate} disabled className="bg-transparent" />
              </Cell>
              <Cell className="w-1/3">
                Dr:
                {attendance.doctor.employee.name}
              </Cell>
              <Cell className="w-1/4">
                {attendance.doctor.specialty}
              </Cell>

              <Cell className={
                clsx(
                  'h-10 rounded-lg',
                  { 'bg-red-300': attendance.type === AttendanceType.URGENT },
                  { 'bg-yellow-300': attendance.type === AttendanceType.PRIORITY },
                  { 'bg-green-300': attendance.type === AttendanceType.STANDARD },
                )
                }
              >
                {attendance.type}
              </Cell>

              <Cell className="border-none">
                <div className="flex gap-4 justify-center">
                  <Link to={`/atendimentos/${attendance.attendanceId}`}>
                    <button type="button" title="Mostrar atendimento">
                      <img src={patientImg} className="w-8 m-auto" alt="" />
                    </button>
                  </Link>
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

export default LastAttendancesTable;
