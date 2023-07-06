import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import Field from '../../components/Field';
import Button from '../../components/Button';
import { Panel, PanelHeader, PanelSubHeader } from '../../components/Panel';
import attendanceService from '../../service/attendance.service';
import Loading from '../../components/loading';
import Input from '../../components/Input';
import { Attendance, Patient } from '../../types/backend.models';
import { getAge, isoToString } from '../../utils/date';
import { UpdateNurseAttendanceDto } from '@/types/backend.dtos';

function NurseAttendance() {
  const params = useParams();

  const attendanceId = params.attendanceId as string;

  const navigate = useNavigate();

  if (!attendanceId) {
    navigate('/atendimentos');
  }

  const { data, isLoading } = useQuery({ queryKey: ['attendances', attendanceId], queryFn: () => attendanceService.getOne(attendanceId) });

  const attendance = data?.result as Attendance;

  const {
    register, handleSubmit, reset,
  } = useForm<UpdateNurseAttendanceDto>({

  });

  useEffect(() => {
    if (attendance) {
      reset({
        weight: attendance.weight,
        diastolicBP: attendance.diastolicBP,
        systolicBP: attendance.systolicBP,
        nurseReport: attendance.nurseReport,
      });
    }
  }, [attendance]);

  const patientId = attendance?.patientId;

  const patient = data?.result.patient as Patient;

  if (isLoading) {
    return <Loading />;
  }

  const onSubmitForm = async (updateData: UpdateNurseAttendanceDto) => {
    const res = await attendanceService.updateNurseInfo(attendanceId, updateData);

    if (res.success) {
      console.log(res);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>

      <Panel>
        <PanelHeader>
          <span className="font-bold">
            Atendimento Enfermaria
          </span>
        </PanelHeader>

        <PanelSubHeader className="grid grid-cols-12 gap-2 p-2 bg-[#d9d9d962]">
          <Input md={5} label="Nome:" disabled value={patient.name} />
          <Input md={1} label="Idade:" disabled value={getAge(patient.birth)} />
          <Input md={2} label="RG:" disabled value={patient.rg} />
          <Input md={2} label="Data:" disabled value={isoToString(attendance.attendanceDate)} />
          <Input md={2} label="Prontuário:" disabled value={attendance.attendanceNumber} />
        </PanelSubHeader>

        <PanelSubHeader className=" bg-[#d9d9d962] p-2">
          <div className="flex justify-between mb-2">
            <div className="flex">
              <Input md={2} className="" asChild label="HIV:">
                <select>
                  <option value="" hidden>selecione</option>
                </select>
              </Input>
            </div>
            <div className="flex">
              <Input md={2} className="" asChild label="Sífilis:">
                <select>
                  <option value="" hidden>selecione</option>
                </select>
              </Input>
            </div>
            <div className="flex">
              <Input md={2} className="" asChild label="Hepatite B:">
                <select>
                  <option value="" hidden>selecione</option>
                </select>
              </Input>
            </div>
            <div className="flex">
              <Input md={2} className="" asChild label="Hepatite C:">
                <select>
                  <option value="" hidden>selecione</option>
                </select>
              </Input>
            </div>
          </div>
          <div className="flex gap-2">
            <Input md={2} label="Un. Solicitante:" className="" />
            <Input md={2} label="Data:" className="" type="date" />
            <Input md={2} label="Nº Doc:" className="" />
            <Button variant="small">Limpar</Button>
            <Button variant="small">Novo</Button>
          </div>

        </PanelSubHeader>

        <PanelSubHeader className="flex justify-center gap-1 p-4 bg-[#d9d9d962]">
          <Field className="px-4 py-1" variant="minimal">PA:</Field>
          <Input md={2} className="w-20" {...register('systolicBP', { valueAsNumber: true })} type="number" />
          <Field className="px-4 py-1" variant="minimal">X</Field>
          <Input md={2} className="w-20" {...register('diastolicBP', { valueAsNumber: true })} type="number" />
          <Field className="px-4 py-1" variant="minimal">mmHg</Field>
          <Field className="px-4 py-1" variant="minimal">Peso:</Field>
          <Input md={2} className="w-20" {...register('weight', { valueAsNumber: true })} type="number" />
          <Field className="px-4 py-1" variant="minimal">Kg</Field>
        </PanelSubHeader>

        <div>
          <Field>
            Outras Considerações
          </Field>
          <textarea className=" mt-2  w-full rounded-lg ring-2 p-2 bg-[#F0F0F0]" rows={4} {...register('nurseReport')} />
        </div>

        <div className="flex gap-6 justify-center py-4">
          <Button type="submit">Concluir</Button>
          <Button onClick={() => navigate(-1)}>Voltar</Button>
        </div>
      </Panel>
    </form>
  );
}

export default NurseAttendance;
