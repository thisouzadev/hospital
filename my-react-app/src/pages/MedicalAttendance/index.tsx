import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
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
import { useAppStore } from '../../store';
import { UserRole } from '@/types/backend.enums';
import InitialPrescription from '../../components/InitialPrescription';
import sectorService from '@/service/sector.service';
import LastExams from '@/components/LastExams';

const fullUpdateAttendanceSchema = yup.object().shape(
  {
    weight: yup.number().required(),
    systolicBP: yup.number().required(),
    diastolicBP: yup.number().required(),
    anamnesis: yup.string().required(),
    exams: yup.string().required(),
    prescription: yup.string().required(),
    quickTestId: yup.string().required('O paciente precisa ter um teste rápido válido'),
  },
).required();

const basicUpdateAttendanceSchema = yup.object().shape(
  {
    weight: yup.number().required(),
    systolicBP: yup.number().required(),
    diastolicBP: yup.number().required(),
    anamnesis: yup.string().required(),
    exams: yup.string().optional(),
    prescription: yup.string().optional(),
    quickTestId: yup.string().required('O paciente precisa ter um teste rápido válido'),
  },
).required();

function MedicalAttendance() {
  const params = useParams();

  const [state] = useAppStore();

  const role = state.currentUser?.role as UserRole;

  const isFullAttendance = role === UserRole.Medico || role === UserRole.Enfermeiro;

  const [isForwardDialogOpen, setIsForwardDialogOpen] = useState(false);
  const [quickTestId, setQuickTestId] = useState('');

  const attendanceId = params.attendanceId as string;

  const navigate = useNavigate();

  if (!attendanceId) {
    navigate('/atendimentos');
  }

  const { data, isLoading } = useQuery({ queryKey: ['attendances', attendanceId], queryFn: () => attendanceService.getOne(attendanceId) });

  const attendance = data?.result as Attendance;

  const {
    register, handleSubmit, reset, formState: { errors }, setValue,
  } = useForm<UpdateTechnicianAttendanceDto>({
    defaultValues: {
      exams: undefined, prescription: undefined, quickTestId: '',
    },
    resolver: yupResolver<UpdateTechnicianAttendanceDto>(isFullAttendance
      ? fullUpdateAttendanceSchema
      : basicUpdateAttendanceSchema),
  });

  useEffect(() => {
    if (attendance) {
      reset({
        weight: attendance.weight,
        diastolicBP: attendance.diastolicBP,
        systolicBP: attendance.systolicBP,
        anamnesis: attendance.anamnesis,
        exams: attendance.exams || '',
        prescription: attendance.prescription || '',
        quickTestId: attendance.quickTestId || quickTestId,
      });
    }
  }, [attendance]);

  const patient = data?.result.patient as Patient;

  if (isLoading) {
    return <Loading />;
  }

  const onFinishAttendance = async (updateData: UpdateTechnicianAttendanceDto) => {
    const res = await attendanceService.updateTechnicianInfo(attendanceId, updateData);

    if (res.success) {
      const finishRes = await sectorService.leftSector({
        sectorId: state.currentSector?.sectorId as string,
        attendanceId,
      });

      if (finishRes.success) {
        navigate(-1);
      }
    }
  };

  const onForwardAttendance = async (updateData: UpdateTechnicianAttendanceDto) => {
    const res = await attendanceService.updateTechnicianInfo(attendanceId, updateData);
    if (res.success) {
      setIsForwardDialogOpen(true);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  const disableEditing = role === UserRole.Farmaceutico;

  const showExams = role === UserRole.Medico
  || role === UserRole.Enfermeiro || role === UserRole.Farmaceutico;

  const showLastExams = role === UserRole.Medico
  || role === UserRole.Enfermeiro;

  const showInitialPrescription = role === UserRole.Medico
  || role === UserRole.Enfermeiro;

  const showPrescription = role === UserRole.Medico
  || role === UserRole.Enfermeiro;

  const showAnamnesis = role === UserRole.Medico
  || role === UserRole.Enfermeiro || role === UserRole.Technician;

  return (
    <form onSubmit={handleSubmit(onFinishAttendance)}>
      <Panel className="flex flex-col gap-4">
        <ForwardDialog
          isOpen={isForwardDialogOpen}
          setIsOpen={setIsForwardDialogOpen}
          attendance={attendance}
          onForwardSuccess={() => navigate(-1)}
        />
        <PanelHeader>
          <span className="font-bold">
            Atendimento
          </span>
        </PanelHeader>

        <AttendanceHeader attendance={attendance} />

        {attendance
          && (
            <PanelSubHeader className={clsx(' bg-[#d9d9d962] p-2', { 'ring-2 ring-red-500 bg-red-200': errors.quickTestId })}>
              <QuickTests
                attendanceId={attendanceId}
                patientId={patient.patientId}
                setQuickTestId={(id) => {
                  setValue('quickTestId', id);
                  setQuickTestId(id);
                }}
              />
              <div><span className="text-red-700">{errors.quickTestId?.message}</span></div>
            </PanelSubHeader>
          )}

        <AttendanceWeightPA register={register} errors={errors} />

        {showAnamnesis
          && (
          <div>
            <Field className="mb-1">
              Anamnese
            </Field>
            <Input asChild {...register('anamnesis')} error={errors.anamnesis}>
              <textarea rows={4} />
            </Input>
          </div>
          )}

        {showLastExams
          && <LastExams patientId={patient.patientId} currentAttendanceId={attendanceId} />}
        {showExams
        && (
        <div>
          <Field className="mb-1">
            Exames
          </Field>
          <Input asChild {...register('exams')} error={errors.exams} disabled={disableEditing}>
            <textarea rows={3} />
          </Input>
        </div>
        )}
        {showInitialPrescription
        && <InitialPrescription patientId={patient.patientId} />}

        {showPrescription
          && (
          <div>
            <Field className="mb-1">
              Evolução da prescrição
            </Field>
            <Input asChild {...register('prescription')} error={errors.prescription}>
              <textarea rows={4} />
            </Input>
          </div>
          )}

        <div className="flex gap-6 justify-center py-4">
          <Button type="submit">Concluir</Button>
          <Button onClick={handleSubmit(onForwardAttendance)}>Encaminhar</Button>
          <Button onClick={() => navigate(-1)}>Voltar</Button>
        </div>
      </Panel>
    </form>
  );
}

export default MedicalAttendance;
