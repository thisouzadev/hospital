import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import attendanceService from '../../service/attendance.service';

import scheduleImg from '../../assets/schedule.svg';
import { Attendance } from '../../types/backend.models';
import { getDate } from '../../utils/date';
import Button from '../../components/Button';

interface AttendanceTableProps {
  attendances:Attendance[]
}
function AttendanceTable({ attendances }:AttendanceTableProps) {
  return (
    <table className="w-full text-sm  text-center border-separate border-spacing">
      <tbody className="border border-red-600">
        {attendances.map((attendance) => (
          <tr key={attendance.attendanceId} className="h-10 border-transparent border-2">
            <td className="bg-white rounded-md text-center font-bold">
              <input type="date" value={attendance.attendanceDate} disabled className="bg-transparent text-center" />
            </td>
            <td className="bg-white rounded-md w-1/3">
              {attendance.patient.name}
            </td>
            <td className="bg-white rounded-md ">
              Agravo
            </td>
            <td className="bg-white rounded-md w-1/3">
              {attendance.doctor
                ? `Dr(a): ${attendance.doctor?.employee?.name}`
                : ''}
            </td>
            <td className="bg-white rounded-md font-bold">
              Detalhar
            </td>
            <td className="">
              <img src={scheduleImg} className="w-8 m-auto" alt="" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function ListAttendances() {
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [lastAttendances, setLastAttendances] = useState<Attendance[]>([]);

  const [selectedDate, setSelectedDate] = useState(getDate(new Date()));

  useEffect(() => {
    const fetchData = async () => {
      const attendancesData = await attendanceService.getAll({ page: 1, perPage: 10 });
      setLastAttendances(attendancesData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const attendancesData = await attendanceService.getAll(
        { attendanceDate: selectedDate, page: 1, perPage: 10 },
      );
      setAttendances(attendancesData);
    };
    fetchData();
  }, [selectedDate]);

  return (
    <div className="w-full">
      <div className="max-w-5xl m-auto pt-10">
        <div className="h-10 bg-[#D9D9D970] mb-2 flex justify-between items-center">
          <button type="button" className="h-full bg-white rounded-md px-12">Últimos 5 agendamentos</button>
          <button type="button" className="h-full bg-white rounded-md px-12">Exibir todos</button>
        </div>
        <div className="shadow-md bg-[#D9D9D970] py-3">
          <AttendanceTable attendances={lastAttendances} />
        </div>

        <div className="h-10 bg-[#D9D9D970] mt-16 flex justify-between items-center">
          <div className="h-full bg-white rounded-md px-12 flex items-center justify-between gap-4">

            <span>Agendamentos para:</span>
            <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
          </div>
          <button type="button" className="h-full bg-white rounded-md px-12">Exibir todos</button>
        </div>
        <div className="shadow-md bg-[#D9D9D970] py-3">
          <AttendanceTable attendances={attendances} />
        </div>
        <Button className="mt-10 no-underline">
          <Link to="novo" className="no-underline text-inherit">
            Agendar
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default ListAttendances;
