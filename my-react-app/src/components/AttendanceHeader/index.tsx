import { Attendance } from '@/types/backend.models';
import { PanelSubHeader } from '../Panel';
import Input from '../Input';
import { getAge, isoToString } from '../../utils/date';

interface Props {
  attendance: Attendance
}

const AttendanceHeader = ({ attendance }:Props) => (
  <PanelSubHeader className="grid grid-cols-12 gap-2 p-2 bg-[#d9d9d962]">
    <Input md={5} label="Nome:" disabled value={attendance.patient?.name} />
    <Input md={1} label="Idade:" disabled value={getAge(attendance.patient.birth)} />
    <Input md={2} label="RG:" disabled value={attendance.patient.rg} />
    <Input md={2} label="Data:" disabled value={isoToString(attendance.attendanceDate)} />
    <Input md={2} label="Prontuário:" disabled value={attendance.attendanceNumber} />
  </PanelSubHeader>
);

export default AttendanceHeader;
