import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Field from '../../components/Field';
import Button from '../../components/Button';
import { Panel, PanelHeader, PanelSubHeader } from '../../components/Panel';
import attendanceService from '../../service/attendance.service';
import Loading from '../../components/loading';
import { Attendance, Patient } from '../../types/backend.models';
import { UpdateTechnicianAttendanceDto } from '@/types/backend.dtos';
import QuickTests from '../../components/QuickTests';
import AttendanceHeader from '../../components/AttendanceHeader';
import AttendanceWeightPA from '../../components/AttendanceWightPA';
import ForwardDialog from '../../components/ForwardDialog';
import Input from '../../components/Input';

const updateAttendanceSchema = yup.object().shape({
  weight: yup.number().required(),
  systolicBP: yup.number().required(),
  diastolicBP: yup.number().required(),
  anamnesis: yup.string().optional(),
}).required();

function DoctorAttendance() {
  const params = useParams();

  const [isForwardDialogOpen, setIsForwardDialogOpen] = useState(false);

  const attendanceId = params.attendanceId as string;

  const navigate = useNavigate();

  if (!attendanceId) {
    navigate('/atendimentos');
  }

  const { data, isLoading } = useQuery({ queryKey: ['attendances', attendanceId], queryFn: () => attendanceService.getOne(attendanceId) });

  const attendance = data?.result as Attendance;

  const {
    register, handleSubmit, reset, formState: { errors },
  } = useForm<UpdateTechnicianAttendanceDto>({
    resolver: yupResolver<UpdateTechnicianAttendanceDto>(updateAttendanceSchema),
  });

  useEffect(() => {
    if (attendance) {
      reset({
        weight: attendance.weight,
        diastolicBP: attendance.diastolicBP,
        systolicBP: attendance.systolicBP,
        anamnesis: attendance.anamnesis,
      });
    }
  }, [attendance]);

  const patient = data?.result.patient as Patient;

  if (isLoading) {
    return <Loading />;
  }

  const onSubmitForm = async (updateData: UpdateTechnicianAttendanceDto) => {
    const res = await attendanceService.updateTechnicianInfo(attendanceId, updateData);

    if (res.success) {
      console.log(res);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="pb-20">
      <ForwardDialog
        isOpen={isForwardDialogOpen}
        setIsOpen={setIsForwardDialogOpen}
        attendance={attendance}
        onForwardSuccess={() => navigate(-1)}
      />
      <Panel className="flex flex-col gap-4">
        <PanelHeader>
          <span className="font-bold">
            Atendimento Médico
          </span>
        </PanelHeader>

        <AttendanceHeader attendance={attendance} />

        <PanelSubHeader className=" bg-[#d9d9d962] p-2">
          <QuickTests attendanceId={attendanceId} patientId={patient.patientId} />
        </PanelSubHeader>

        <AttendanceWeightPA register={register} errors={errors} />

        <div>
          <Field className="mb-1">
            Anamnese
          </Field>
          <Input asChild {...register('anamnesis')} error={errors.anamnesis}>
            <textarea rows={4} />
          </Input>
        </div>

        <div>
          <Field>
            Prescrição Inicial
          </Field>
          <textarea className=" mt-2  w-full rounded-lg ring-2 p-2 bg-[#F0F0F0]" rows={4} />
        </div>

        <div>
          <Field>
            Evolução da Prescrição
          </Field>
          <textarea className=" mt-2  w-full rounded-lg ring-2 p-2 bg-[#F0F0F0]" rows={4} />
        </div>

        <div className="flex gap-6 justify-center py-4">
          <Button type="submit">Concluir</Button>
          <Button onClick={() => setIsForwardDialogOpen(true)}>Encaminhar</Button>
          <Button onClick={() => navigate(-1)}>Voltar</Button>
        </div>
      </Panel>
    </form>
  );
}

export default DoctorAttendance;
