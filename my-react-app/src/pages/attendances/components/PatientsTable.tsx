import clsx from 'clsx';
import { PropsWithChildren } from 'react';
import scheduleImg from '../../../assets/schedule2.svg';
import { Patient } from '../../../types/backend.models';

interface AttendanceTableProps {
  patients:Patient[]
  selectedPatient?: Patient
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

function PatientsTable({ patients, onSelectPatient, selectedPatient }:AttendanceTableProps) {
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
            CNS:
          </Cell>
          <Cell className="border-none invisible w-14">
            <img src={scheduleImg} className="" alt="" />
          </Cell>
        </tr>
      </thead>
      <tbody className="">
        {patients.map((patient) => (
          <tr key={patient.patientId} className={clsx('h-10 group rounded-lg', { 'ring-orange-700 ring-2': selectedPatient?.patientId === patient.patientId })}>
            <Cell className="w-1/2">
              {patient.name}
            </Cell>
            <Cell className="w-1/4">
              <input type="date" value={patient.birth} className="bg-transparent text-center" disabled />
            </Cell>
            <Cell>
              {patient.cns}
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

export default PatientsTable;
