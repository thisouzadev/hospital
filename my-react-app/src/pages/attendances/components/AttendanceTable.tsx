import clsx from 'clsx';
import { PropsWithChildren } from 'react';
import scheduleImg from '../../../assets/schedule2.svg';
import { Patient } from '../../../types/backend.models';

interface AttendanceTableProps {
  patients:Patient[]
  onSelectPatient: (patient:Patient) => void
}

const Cell = ({ children, className }: PropsWithChildren<{ className?: string }>) => (
  <td className={
    clsx(
      'h-11 bg-[#D9D9D9] rounded-xl border-2 border-blue-400 group-hover:bg-[#f3f2f2]',
      className,
    )
  }
  >
    {children}
  </td>
);

function AttendanceTable({ patients, onSelectPatient }:AttendanceTableProps) {
  return (
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
          <Cell className="border-none invisible">
            <img src={scheduleImg} className="w-8 m-auto" alt="" />
          </Cell>
        </tr>
      </thead>
      <tbody className="">
        {patients.map((patient) => (
          <tr key={patient.patientId} className="h-10 group">
            <Cell className="w-1/2">
              {patient.name}
            </Cell>
            <Cell className="w-1/4">
              <input type="date" value={patient.birth} className="bg-transparent text-center" disabled />
            </Cell>
            <Cell>
              {patient.attendances[0]?.attendanceNumber}
            </Cell>
            <Cell className="border-none">
              <button type="button" onClick={() => onSelectPatient(patient)}>
                <img src={scheduleImg} className="w-8 m-auto" alt="" />
              </button>
            </Cell>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AttendanceTable;
