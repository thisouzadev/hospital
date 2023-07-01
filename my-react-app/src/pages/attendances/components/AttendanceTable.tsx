import clsx from 'clsx';
import { PropsWithChildren, useEffect, useState } from 'react';
import { AttendanceStatus } from '../../../types/backend.enums';
import scheduleImg from '../../../assets/schedule2.svg';
import { Patient } from '../../../types/backend.models';
import { getDate } from '../../../utils/date';
import patientService from '../../../service/patient.service';

interface AttendanceTableProps {

  onSelectPatient: (patient:Patient) => void
}

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

const DEBUG_MODE = false;

function AttendanceTable({ onSelectPatient }:AttendanceTableProps) {
  // const [attendances, setAttendances] = useState<Attendance[]>([]);

  const [lastAttendances, setLastAttendances] = useState<Patient[]>([]);

  const [selectedAttendanceId, setSelectedAttendanceId] = useState('');

  const [selectedDate, setSelectedDate] = useState(getDate(new Date()));

  useEffect(() => {
    const fetchData = async () => {
      const query = DEBUG_MODE ? {} : { attendanceDate: selectedDate };
      const res = await patientService.searchPatients(query);

      setLastAttendances(res.result);
    };
    fetchData();
  }, [selectedDate]);

  const handleSelectAttendance = (attendance: Patient) => {
    setSelectedAttendanceId(attendance.patientId);
    onSelectPatient(attendance);
  };

  return (
    <div>
      <div className="flex items-center justify-evenly h-11 bg-[#D9D9D9] rounded-lg border-2 border-blue-400 group-hover:bg-[#f3f2f2] text-lg">
        <div>
          <span>{'Pacientes do dia:  '}</span>
          <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="bg-transparent" />
        </div>
        <div>
          <label htmlFor="status">
            <span>Status:</span>
            <select className="bg-transparent w-52" name="status">
              <option hidden value="">{' '}</option>
              {
              Object.values(AttendanceStatus).map((status) => (
                <option key={status} value={status}>{status.toUpperCase()}</option>
              ))
            }
            </select>

          </label>
        </div>
      </div>

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
          {lastAttendances.map((patient) => (
            <tr key={patient.patientId} className={clsx('h-10 group rounded-lg', { 'ring-orange-700 ring-2': selectedAttendanceId === patient.patientId })}>
              <Cell className="w-1/2">
                {patient.name}
              </Cell>
              <Cell className="w-1/4">
                <input type="date" value={patient.birth} className="bg-transparent text-center" disabled />
              </Cell>
              <Cell>
                {patient.attendances[0]?.attendanceNumber}
              </Cell>
              <Cell>
                {patient.attendances[0]?.status}
              </Cell>
              <Cell className="border-none">
                <button type="button" onClick={() => handleSelectAttendance(patient)}>
                  <img src={scheduleImg} className="w-8 m-auto" alt="" />
                </button>
              </Cell>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AttendanceTable;
