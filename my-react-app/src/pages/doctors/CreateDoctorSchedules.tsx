import { PropsWithChildren, useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { CreateDoctorScheduleDto } from 'types/backend.dtos';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import weekDays from '../../types/date';
import doctorsService from '../../service/doctors.service';
import { Doctor, DoctorSchedule } from '../../types/backend.models';
import Button from '../../components/Button';
import Input from '../../components/Input';
import SearchImg from '../../assets/search.svg';
import DoctorImg from '../../assets/doctor.svg';
import EditImg from '../../assets/edit.svg';
import DeleteImg from '../../assets/delete.svg';

const scheduleSchema = {
  doctorId: yup.string().required(),
  weekDay: yup.number().required(),
  startAt: yup.string().required(),
  endAt: yup.string().required(),
  vacancies: yup.number().required(),
};

const Field = ({ children }:PropsWithChildren) => (
  <div className="rounded-lg bg-[#f0f0f0] w-full text-center p-1 ring-1 ring-blue-300 h-10 text-xl">{children}</div>
);

interface IDoctorFilter {name: string, cns: string, cpf: string}

const filterDoctors = (doctors: Doctor[], filter: IDoctorFilter):Doctor[] => doctors.filter(
  (doctor) => doctor.employee.name.startsWith(
    filter.name,
  )
    && doctor.employee.cpf.startsWith(filter.cpf)
    && (!doctor.employee.cns || doctor.employee.cns.startsWith(filter.cns)),
);

const defaultScheduleValues = {
  doctorId: '', weekDay: '', startAt: '', endAt: '', vacancies: '',
};

const CreateDoctorSchedules = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const [doctorFilter, setDoctorFilters] = useState<IDoctorFilter>({ name: '', cns: '', cpf: '' });

  const [selectedDoctor, setSelectedDoctor] = useState<Doctor>();

  const [showDoctorData, setShowDoctorData] = useState(false);

  const {
    register, handleSubmit, reset, formState: { errors, touchedFields },
  } = useForm<CreateDoctorScheduleDto>({
    defaultValues: defaultScheduleValues as any as CreateDoctorScheduleDto,
    resolver: yupResolver(yup.object().shape(scheduleSchema).required()),

  });

  const [selectedScheduleId, setSelectedScheduleId] = useState('');

  const handleChangeFilter = (item: keyof IDoctorFilter, e:any) => {
    const { value } = e.target;
    const newFilter = { ...doctorFilter, [item]: value };
    setDoctorFilters(newFilter);
  };

  const handleResetSchedule = () => {
    setSelectedScheduleId('');
    setShowDoctorData(false);
    reset(defaultScheduleValues as any as CreateDoctorScheduleDto);
  };

  const handleSelectDoctor = (doctor: Doctor) => {
    handleResetSchedule();
    setSelectedDoctor(doctor);
  };

  const handleDeleteSchedule = async (schedule: DoctorSchedule) => {
    // eslint-disable-next-line no-alert
    if (!window.confirm('Deseja excluir a agenda')) {
      return;
    }
    const deleteResponse = await doctorsService.removeSchedule(schedule.scheduleId);
    if (deleteResponse.success) {
      handleResetSchedule();
      const updatedDoctor = doctors.find((d) => d.doctorId === schedule.doctorId);
      if (updatedDoctor) {
        updatedDoctor.schedules = updatedDoctor.schedules.filter(
          (s) => s.scheduleId !== schedule.scheduleId,
        );
        const newDoctors = doctors.map((d) => (
          d.doctorId === updatedDoctor.doctorId ? updatedDoctor : d
        ));
        setDoctors(newDoctors);
        setSelectedDoctor(updatedDoctor);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await doctorsService.getAll();
      setDoctors(response);
    };
    fetchData();
  }, []);

  const handleAddSchedule = async (data: CreateDoctorScheduleDto) => {
    const response = await doctorsService.createSchedule(data);
    if (response.success) {
      toast.success('Agenda criada com sucesso');
      const resultSchedule = response.result as DoctorSchedule;

      const updatedDoctor = doctors.find((d) => d.doctorId === resultSchedule.doctorId);

      if (updatedDoctor) {
        updatedDoctor.schedules.push(resultSchedule);

        updatedDoctor.schedules = updatedDoctor.schedules.sort((a, b) => a.weekDay - b.weekDay);

        const newDoctors = doctors.map((d) => (
          d.doctorId === updatedDoctor.doctorId ? updatedDoctor : d
        ));
        setDoctors(newDoctors);
        setSelectedDoctor(updatedDoctor);
      }
    }
  };
  const handleUpdateSchedule = async (data: CreateDoctorScheduleDto) => {
    if (!selectedScheduleId) {
      return;
    }

    const isFormTouched = Object.keys(touchedFields).length > 0;
    if (!isFormTouched) {
      return;
    }
    const response = await doctorsService.updateSchedule(selectedScheduleId, data);

    if (response.success) {
      toast.success('Agenda atualizada com sucesso');
    }
    const resultSchedule = response.result as DoctorSchedule;

    const updatedDoctor = doctors.find((d) => d.doctorId === resultSchedule.doctorId);

    if (updatedDoctor) {
      updatedDoctor.schedules = updatedDoctor.schedules.map((s) => (
        s.scheduleId === resultSchedule.scheduleId ? resultSchedule : s));

      updatedDoctor.schedules = updatedDoctor.schedules.sort((a, b) => a.weekDay - b.weekDay);

      const newDoctors = doctors.map((d) => (
        d.doctorId === updatedDoctor.doctorId ? updatedDoctor : d
      ));
      setDoctors(newDoctors);
      setSelectedDoctor(updatedDoctor);
    }
  };

  const handleSelectSchedule = (schedule: DoctorSchedule) => {
    const {
      doctorId, weekDay, startAt, endAt, vacancies,
    } = schedule;

    setSelectedScheduleId(schedule.scheduleId);

    setShowDoctorData(true);

    reset({
      doctorId, weekDay, startAt, endAt, vacancies,
    });
  };

  const handleChangeDoctor = (e:any) => {
    const doctor = doctors.find((d) => d.doctorId === e.target.value);

    setShowDoctorData(true);

    setSelectedDoctor(doctor);
  };

  const doctorIdRegister = register('doctorId');

  return (
    <div className="bg-[#D9D9D980] rounded-xl w-full">
      <Field>
        Criação de Agenda Médica
      </Field>
      <div className=" mt-2 bg-[#D9D9D980] rounded-xl">
        <div className="p-2 flex gap-3 items-center">
          <Input
            textCenter
            className="ring-blue-300 bg-[#D9D9D980] text-xl a"
            placeholder="Nome do Médico"
            md={5}
            value={doctorFilter.name}
            onChange={(e) => handleChangeFilter('name', e)}
          />
          <Input
            textCenter
            className="ring-blue-300 bg-[#D9D9D980] text-xl a"
            placeholder="CNS"
            md={5}
            onChange={(e) => handleChangeFilter('cns', e)}

          />
          <Input
            textCenter
            className="ring-blue-300 bg-[#D9D9D980] text-xl a"
            placeholder="CPF"
            md={5}
            onChange={(e) => handleChangeFilter('cpf', e)}

          />
          <img src={SearchImg} alt="" className="pt-1" />
        </div>
        <div>
          <table className="w-full text-sm text-center border-separate border-spacing-y-2 border-spacing-x-2">
            <tbody className="border">
              {filterDoctors(doctors, doctorFilter).map((doctor) => (
                <tr key={doctor.doctorId} className="h-10  rounded-lg ring-2 ring-blue-300 ">
                  <td className="w-3/6 ">
                    <Field>
                      {doctor.employee.name}
                    </Field>
                  </td>
                  <td className="w-1/5">
                    <Field>
                      {doctor.employee.cns}
                    </Field>
                  </td>
                  <td className="w-1/4">
                    <Field>
                      {doctor.employee.cpf}
                    </Field>
                  </td>
                  <td className="px-2 rounded-lg">
                    <button type="button" onClick={() => { handleSelectDoctor(doctor); }}>
                      <img src={DoctorImg} alt="" className="pt-1" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      <div className="grid grid-cols-12 gap-2 mt-2 p-2 bg-[#D9D9D980] rounded-lg">
        <Input
          textCenter
          className="ring-blue-300 bg-[#D9D9D980] text-xl a"
          placeholder="Nome do Médico"
          md={8}
          // {...register('doctorId')}
          {...doctorIdRegister}
          error={errors.doctorId}
          onChange={(e) => { doctorIdRegister.onChange(e); handleChangeDoctor(e); }}
          asChild
        >
          <select
            defaultValue=""
            disabled={!!selectedScheduleId}
            className={selectedScheduleId ? 'appearance-none' : ''}
          >
            <option value="" hidden>Nome do Médico</option>
            {
              doctors.map((doctor) => (
                <option key={doctor.doctorId} value={doctor.doctorId} className="bg-transparent appearance-none">{doctor.employee.name}</option>
              ))
            }
          </select>
        </Input>
        <Input
          textCenter
          className="ring-blue-300 bg-[#D9D9D980] text-xl a"
          placeholder="Especialidade"
          md={4}
          value={showDoctorData ? selectedDoctor?.specialty : ''}
          disabled
        />

        <Input
          textCenter
          className="ring-blue-300 bg-[#D9D9D980] text-xl a"
          placeholder="Nome da unidade"
          disabled
          md={4}
          // value={selectedSchedule ? selectedDoctor?.employee.hospital.name : ''}
          value={showDoctorData ? selectedDoctor?.employee.hospital.name : ''}

        />
        <Input
          textCenter
          className="ring-blue-300 bg-[#D9D9D980] text-xl a"
          placeholder="Dia da Semana"
          {...register('weekDay', { valueAsNumber: true })}
          error={errors.weekDay}
          md={2}
          asChild
        >
          <select defaultValue="">
            <option value="" hidden>Dia da Semana</option>
            {
              weekDays.map((weekDay, index) => (
                <option key={weekDay} value={index} className="bg-transparent appearance-none">{weekDay}</option>
              ))
            }
          </select>
        </Input>
        <Input
          textCenter
          className="ring-blue-300 bg-[#D9D9D980] text-xl a"
          label="Início:"
          type="time"
          {...register('startAt')}
          error={errors.startAt}
          md={2}
        />
        <Input
          textCenter
          className="ring-blue-300 bg-[#D9D9D980] text-xl a"
          label="Fim:"
          type="time"
          {...register('endAt')}
          error={errors.endAt}
          md={2}
        />
        <Input
          textCenter
          className="ring-blue-300 bg-[#D9D9D980] text-xl a"
          label="Vagas:"
          type="number"
          {...register('vacancies', { valueAsNumber: true })}
          error={errors.vacancies}
          md={2}
        />

        <div className="flex justify-center gap-10 py-8 w-full col-span-12">
          <Button variant="small" onClick={handleSubmit(handleUpdateSchedule)} disabled={!selectedScheduleId}>Editar</Button>
          <Button variant="small" onClick={handleSubmit(handleAddSchedule)}>Incluir</Button>
          <Button variant="small" onClick={() => handleResetSchedule()}>Limpar</Button>
        </div>
      </div>

      <div className="mt-3">
        <Field>Agendas Disponíveis</Field>
        <table className="w-full text-sm text-center border-separate border-spacing-y-2 border-spacing-x-2">
          <tbody className="border">
            {selectedDoctor?.schedules.length === 0
              && <div className="text-lg">Nenhuma agenda cadastrada</div>}
            {selectedDoctor?.schedules.map((schedule) => (
              <tr key={schedule.scheduleId} className="h-10  rounded-lg ring-2 ring-blue-300 ">
                <td className="w-3/6 ">
                  <Field>
                    {selectedDoctor?.employee.name}
                  </Field>
                </td>
                <td className="w-1/5">
                  <Field>
                    {weekDays[schedule.weekDay]}
                  </Field>
                </td>
                <td className="w-1/5">
                  <Field>
                    {schedule.vacancies}
                    {' '}
                    vagas
                  </Field>
                </td>
                <td className="px-2 rounded-lg">
                  <button type="button" onClick={() => handleSelectSchedule(schedule)}>
                    <img src={EditImg} alt="" className="pt-1" />
                  </button>
                </td>
                <td className="px-2 rounded-lg">
                  <button type="button" onClick={() => handleDeleteSchedule(schedule)}>
                    <img src={DeleteImg} alt="" className="pt-1" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreateDoctorSchedules;
