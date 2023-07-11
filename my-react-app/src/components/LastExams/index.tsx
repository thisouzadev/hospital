import { useQuery } from 'react-query';
import Field from '../Field';
import attendanceService from '@/service/attendance.service';
import { ListAttendanceQueryDto } from '@/types/backend.dtos';
import Loading from '../loading';
import { isoToString } from '../../utils/date';

interface Props {
  patientId:string
  currentAttendanceId?: string
}

const LastExams = ({ patientId, currentAttendanceId }:Props) => {
  const filters:ListAttendanceQueryDto = {
    patientId,
    orderBy: 'createdAt',
    orderType: 'ASC',
    take: 10,
  };

  const { data, isLoading } = useQuery({ queryKey: ['attendances'], queryFn: () => attendanceService.getAll(filters) });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Field className="mb-1">
        Últimos exames
      </Field>
      <Field className="p-2 w-full h-32 overflow-y-auto bg-[#e0e0e0a0]">
        {data?.result.filter(
          (att) => att.attendanceId !== currentAttendanceId,
        ).map((attendance) => (
          <div>
            <div>
              {`Data: ${isoToString(attendance.attendanceDate || '')}`}
              {' '}
              {`Dr: ${isoToString(attendance.doctor.employee.name || '')}`}
            </div>
            <div className="border-b-2 mb-2">
              {attendance.exams || '...nada registrado'}
            </div>

          </div>
        ))}
      </Field>
    </div>
  );
};

export default LastExams;
