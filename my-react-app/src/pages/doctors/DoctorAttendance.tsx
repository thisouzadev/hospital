import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import clsx from 'clsx';
import Button from '../../components/Button';
import { Panel, PanelHeader, PanelSubHeader } from '../../components/Panel';
import attendanceService from '../../service/attendance.service';
import Loading from '../../components/loading';
import Input from '../../components/Input';
import { Attendance, Patient } from '../../types/backend.models';
import { getAge, getTime } from '../../utils/date';
import { AttendanceStatus, AttendanceType } from '../../types/backend.enums';
import { ListAttendanceQueryDto } from '../../types/backend.dtos';
import LastAttendancesTable from './LastAttendancesTable';

function DoctorAttendance() {
  const params = useParams();

  const attendanceId = params.attendanceId as string;

  const navigate = useNavigate();

  if (!attendanceId) {
    navigate('/atendimentos');
  }

  const { data, isLoading } = useQuery({ queryKey: ['attendances', attendanceId], queryFn: () => attendanceService.getOne(attendanceId) });

  const attendance = data?.result as Attendance;

  const patientId = attendance?.patientId;

  const handleFinishAttendance = async () => {
    if (!window.confirm('Deseja finalizar o atendimento?')) {
      return;
    }

    const response = await attendanceService.finish(attendanceId);

    if (response.success) {
      navigate('/atendimentos');
    }
  };

  const filters:ListAttendanceQueryDto = {
    // doctorId: get from context
    patientId: patientId as string,
    status: AttendanceStatus.FINISHED,
    orderBy: 'attendanceDate',
    orderType: 'DESC',
    take: 5,
  };

  const lastAttendances = useQuery({
    queryKey: ['attendances', filters],
    queryFn: () => attendanceService.getAll(filters),
    enabled: !!patientId,
  });

  const patient = data?.result.patient as Patient;

  const doctor = data?.result.doctor;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Panel>
      <PanelHeader>
        <span className="font-bold">
          Atendimento
        </span>
      </PanelHeader>

      <div className="grid grid-cols-12 gap-2 pb-4 pt-2">
        <Input md={5} label="Médico:" disabled value={doctor?.employee.name || ''} />
        <Input md={4} label="Especialidade:" disabled value={doctor?.specialty || ''} />
        <Input md={3} label="CNS:" disabled value={doctor?.employee.cns || ''} />

        <Input md={4} label="Data:" type="date" disabled value={attendance.attendanceDate} />
        <Input md={4} label="Hora de chegada:" type="time" disabled value={getTime(attendance.confirmedAt)} />
        <Input
          md={4}
          label="Atendimento:"
          disabled
          value={attendance.type}
          className={clsx(
            'h-10 rounded-lg',
            { 'bg-red-300': attendance.type === AttendanceType.URGENT },
            { 'bg-yellow-300': attendance.type === AttendanceType.PRIORITY },
            { 'bg-green-300': attendance.type === AttendanceType.STANDARD },
          )}
        />
      </div>

      <PanelSubHeader>
        Paciente
      </PanelSubHeader>
      <div className="grid grid-cols-12 gap-2 pb-10 pt-2">
        <Input md={7} label="Nome:" disabled value={patient.name} />
        <Input md={3} label="Nascimento:" type="date" disabled value={patient.birth} />
        <Input md={2} label="Idade:" disabled value={getAge(patient.birth)} />

        <Input md={4} label="Profissão:" disabled value={patient.occupation} />
        <Input md={4} label="Estado Civil:" disabled value={patient.maritalState} />
        <Input md={4} label="Raça:" disabled value={patient.race} />

      </div>
      <PanelSubHeader>
        Últimos atendimentos
      </PanelSubHeader>
      <div className="pt-2 pb-4">
        {lastAttendances.isLoading
          ? <Loading />
          : <LastAttendancesTable attendances={lastAttendances.data?.result || []} />}

      </div>

      <PanelSubHeader>
        Dados do atendimento
      </PanelSubHeader>
      <div>
        <textarea className=" mt-2  w-full rounded-md ring-2 p-2 bg-[#F0F0F0]" rows={5} placeholder="Informe os dados pertinentes de estado de saúde e tratamento" />
      </div>

      <div className="flex gap-6 justify-center py-4">
        <Button onClick={() => handleFinishAttendance()}>Encerrar</Button>
        <Button onClick={() => navigate(-1)}>Voltar</Button>
      </div>
    </Panel>
  );
}

export default DoctorAttendance;
