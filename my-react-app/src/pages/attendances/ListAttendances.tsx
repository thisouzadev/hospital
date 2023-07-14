import { useEffect, useState } from 'react';
import {
  format, lastDayOfMonth, setMonth, addDays,
} from 'date-fns';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from 'react-query';
import { AttendanceStatus } from '../../types/backend.enums';
import SearchPatients from '../../components/SearchPatients';
import { monthNames } from '../../types/date';
import attendanceService from '../../service/attendance.service';
import doctorsService from '../../service/doctors.service';
import Button from '../../components/Button';
import {
  Panel, PanelContent, PanelSubHeader,
} from '../../components/Panel';

import Input from '../../components/Input';
import { CreateAttendanceDto } from '../../types/backend.dtos';

import AvailableSchedules, { IAvailableSchedules } from './components/AvailableSchedules';
import PatientsTable from './components/PatientsTable';
import Attendances from '../../components/Attendances';
import {
  IAttendance, IDoctor, IDoctorSchedule, IPatient,
} from '@/types/backend.interfaces';

interface SelectableInterval {
  firstDay: string;
  lastDay: string
}
const selectableIntervals: SelectableInterval[] = [...Array(10).keys()].map((item) => (
  {
    firstDay: format(setMonth(new Date(), ((new Date())).getMonth() + item), 'yyyy-MM-01'),
    lastDay: format(lastDayOfMonth(setMonth(new Date(), ((new Date())).getMonth() + item)), 'yyyy-MM-dd'),
  }));

function ListAttendances() {
  const queryClient = useQueryClient();

  const [searchedPatients, setSearchedPatients] = useState<IPatient[]>([]);

  const [selectedPatient, setSelectedPatient] = useState<IPatient>();
  const [selectedDoctor, setSelectedDoctor] = useState<IDoctor>();
  const [selectedSchedule, setSelectedSchedule] = useState<IAvailableSchedules>();

  const [selectedIntervalIndex, setSelectedIntervalIndex] = useState<number>();

  const [doctors, setDoctors] = useState<IDoctor[]>([]);

  const [availableSchedules, setAvailableSchedules] = useState<IAvailableSchedules[]>([]);

  const handleResetAttendance = () => {
    setSelectedPatient(undefined);
    setSelectedDoctor(undefined);
    setSelectedSchedule(undefined);
    setSelectedIntervalIndex(undefined);
    setAvailableSchedules([]);
  };

  const createAttendanceMutation = useMutation(attendanceService.create, {
    onSuccess: () => {
      // Invalidate and refetch
      handleResetAttendance();
      toast.success('Atendimento agendado com sucesso');
      queryClient.invalidateQueries('attendances');
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await doctorsService.getAll();
      setDoctors(response.result);
    };
    fetchData();
  }, []);

  const handleSelectPatient = (patient:IPatient) => {
    setSelectedPatient(patient);
  };

  const handleSelectAttendance = (attendance:IAttendance) => {
    setSelectedPatient(attendance.patient);
  };

  const handleSelectDoctorById = (id : string) => {
    const doctor = doctors.find((d) => d.doctorId === id);
    if (doctor) {
      setSelectedDoctor(doctor);
    }
  };

  const getDaysArray = (start:string, end:string) => {
    const startDate = (new Date(`${start}T03:00:00Z`));
    const endDate = (new Date(`${end}T03:00:00Z`));

    let date = new Date(startDate);

    const result: Date[] = [];

    while (date <= endDate) {
      result.push(date);
      date = addDays(date, 1);
    }

    return result;
  };

  const handleSelectMonthInterval = async () => {
    if (!selectedIntervalIndex) { return; }
    const interval = selectableIntervals[selectedIntervalIndex];

    setSelectedSchedule(undefined);

    if (!interval || !selectedDoctor) {
      return;
    }
    const res = await doctorsService.getSchedules(
      {
        attendanceStartDate: interval.firstDay,
        attendanceEndDate: interval.lastDay,
        doctorId: selectedDoctor?.doctorId || '',
      },
    );

    if (res.error) {
      return;
    }

    const schedules: IDoctorSchedule[] = res.result;

    const schedulesWeekDays = schedules.map((s) => s.weekDay);

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const totalMonthDates = getDaysArray(interval.firstDay, interval.lastDay).filter(
      (date) => date >= currentDate,
    );

    const schedulableDates = totalMonthDates.filter(
      (date) => schedulesWeekDays.includes(date.getDay()),
    );
    const newAvailableSchedules: IAvailableSchedules[] = schedulableDates.map((date) => {
      const isoDate = format(date, 'yyyy-MM-dd');
      const weekDay = date.getDay();

      const availableSchedule = schedules.find((s) => s.weekDay === weekDay) as IDoctorSchedule;

      const attendancesScheduledToDay = availableSchedule.attendances.filter(
        (attendance) => attendance.attendanceDate === isoDate
        && attendance.status !== AttendanceStatus.CANCELED,
      );

      return {
        date,
        isoDate,
        doctorName: selectedDoctor.employee.name,
        specialty: selectedDoctor.specialty,
        scheduleId: availableSchedule.scheduleId,
        weekDay,
        vacancies: availableSchedule.vacancies - attendancesScheduledToDay.length,
        available: 0,
      };
    });

    setAvailableSchedules(newAvailableSchedules);
  };

  useEffect(() => {
    if (selectedDoctor && selectedIntervalIndex) {
      handleSelectMonthInterval();
    }
  }, [selectedDoctor, selectedIntervalIndex]);

  const handleCreateSchedule = async () => {
    if (!selectedPatient || !selectedSchedule || !selectedDoctor) {
      return;
    }
    const attendanceDto: CreateAttendanceDto = {
      patientId: selectedPatient.patientId,
      attendanceDate: selectedSchedule.isoDate,
      doctorScheduleId: selectedSchedule.scheduleId,
      doctorId: selectedDoctor.doctorId,
    };
    createAttendanceMutation.mutate(attendanceDto);
    // post
  };

  const handleSelectSchedule = (schedule: IAvailableSchedules) => {
    if (schedule.vacancies === 0) {
      if (!window.confirm('Não há mais vagas para este dia, deseja agendar mesmo assim?')) {
        return;
      }
    }
    setSelectedSchedule(schedule);
  };

  return (
    <Panel>
      <PanelContent>
        <Attendances onSelectAttendance={handleSelectAttendance} />
      </PanelContent>
      <PanelSubHeader>
        <SearchPatients onSuccess={setSearchedPatients} />
      </PanelSubHeader>
      <PanelContent>
        <PatientsTable
          patients={searchedPatients}
          onSelectPatient={handleSelectPatient}
          selectedPatient={selectedPatient}
        />
      </PanelContent>
      <PanelSubHeader>
        <div className="grid grid-cols-12 gap-2">
          <Input md={6} label="Nome:" value={selectedPatient ? selectedPatient?.name : ''} className="bg-transparent" disabled />
          <Input md={3} label="Nascimento:" value={selectedPatient ? selectedPatient?.birth : ''} type="date" disabled className="bg-transparent" />
          <Input md={3} label="CNS:" value={selectedPatient ? selectedPatient?.cns : ''} className="bg-transparent" disabled />

          <Input
            md={2}
            label="Mês:"
            className="bg-transparent"
            value={selectedIntervalIndex || ''}
            onChange={(e:any) => setSelectedIntervalIndex(e.target.value)}
            asChild
          >
            <select>
              <option value="" hidden>{' '}</option>
              {
              selectableIntervals.map((interval, index) => (
                <option key={interval.firstDay} value={index} className="bg-transparent appearance-none">{monthNames[Number(interval.firstDay.split('-')[1])]}</option>
              ))
            }
            </select>
          </Input>

          <Input md={2} label="Data:" className="bg-transparent" disabled type="date" value={(selectedSchedule && selectedSchedule.isoDate) || ''} />

          <Input
            textCenter
            className="bg-transparent"
            md={5}
            value={selectedDoctor?.doctorId || ''}
            onChange={(e:any) => handleSelectDoctorById(e.target.value)}
            asChild
          >
            <select>
              <option value="" hidden>Nome do Médico</option>
              {
              doctors.map((doctor) => (
                <option key={doctor.doctorId} value={doctor.doctorId} className="bg-transparent appearance-none">{doctor.employee.name}</option>
              ))
            }
            </select>

          </Input>
          <Input md={3} placeholder="Especialidade" value={selectedDoctor ? selectedDoctor?.specialty : ''} className="bg-transparent" disabled />

          <div className="flex justify-center gap-10 py-8 w-full col-span-12">
            <Button
              variant="small"
              onClick={() => handleCreateSchedule()}
            >
              Agendar
            </Button>
            <Button
              variant="small"
              onClick={() => handleResetAttendance()}
            >
              Limpar
            </Button>
          </div>
        </div>
      </PanelSubHeader>
      <PanelSubHeader>
        <AvailableSchedules
          availableSchedules={availableSchedules}
          selectedSchedule={selectedSchedule}
          onSelectSchedule={handleSelectSchedule}
          emptyMessage={selectedDoctor && selectedIntervalIndex ? 'Não foram encontradas agendas' : 'Selecione médico e mês'}
        />
      </PanelSubHeader>
    </Panel>
  );
}

export default ListAttendances;
