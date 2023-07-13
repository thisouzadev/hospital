import { useQuery } from 'react-query';
import Field from '../Field';
import attendanceService from '@/service/attendance.service';
import { ListAttendanceQueryDto } from '@/types/backend.dtos';
import Loading from '../loading';
import { isoToString } from '../../utils/date';

interface Props {
  patientId:string
}

const InitialPrescription = ({ patientId }:Props) => {
  const filters:ListAttendanceQueryDto = {
    patientId,
    orderBy: 'createdAt',
    orderType: 'ASC',
    take: 1,
    page: 1,
  };

  const { data, isLoading } = useQuery({ queryKey: ['attendances', filters], queryFn: () => attendanceService.getAll(filters) });

  if (isLoading) {
    return <Loading />;
  }

  const initialAttendance = data?.result[0];

  return (
    <div>
      <Field className="mb-1">
        Prescrição inicial
      </Field>
      <Field className="p-2 w-full h-32 overflow-y-auto bg-[#e0e0e0a0]">
        <div>
          {`Data: ${isoToString(initialAttendance?.attendanceDate || '')}`}
          {' '}
          {`Dr: ${isoToString(initialAttendance?.doctor.employee.name || '')}`}
        </div>
        <div>
          {initialAttendance?.prescription || ''}
        </div>
      </Field>
    </div>
  );
};

export default InitialPrescription;
