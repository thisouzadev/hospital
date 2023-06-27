import { PropsWithChildren, useEffect, useState } from 'react';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import DatePicker, { registerLocale } from 'react-datepicker';
import ptBR from 'date-fns/locale/pt-BR';
import { getDay } from 'date-fns';
import doctorsService from '../../service/doctors.service';
import patientService from '../../service/patient.service';
import Button from '../../components/Button';
import {
  Panel, PanelContent, PanelHeader, PanelSubHeader,
} from '../../components/Panel';

import 'react-datepicker/dist/react-datepicker.css';

import scheduleImg from '../../assets/schedule2.svg';
import { Doctor, Patient } from '../../types/backend.models';
import { getDate } from '../../utils/date';
import Input from '../../components/Input';
import { SearchPatientQueryDto } from '../../types/backend.dtos';

registerLocale('pt-BR', ptBR);

interface AttendanceTableProps {
  patients:Patient[]
  onSelectPatient: (patient:Patient) => void
}

const DEBUG_MODE = true;

const Cell = ({ children, className }: PropsWithChildren<{ className?: string }>) => (
  <td className={
    clsx(
      'h-11 bg-[#D9D9D9] rounded-xl border-2 border-blue-400 group-hover:bg-[#f3f2f2]',
      className,
    )
  }
  >
    {children}
  </td>
);

function AttendanceTable({ patients, onSelectPatient }:AttendanceTableProps) {
  return (
    <table className="w-full text-center align-middle border-spacing-y-1 border-separate">
      <thead>
        <tr className="h-10 group font-bold">
          <Cell className="w-1/2">
            Nome
          </Cell>
          <Cell className="w-1/4">
            Nascimento
          </Cell>
          <Cell>
            No atendimento:
          </Cell>
          <Cell className="border-none" />
        </tr>
      </thead>
      <tbody className="">
        {patients.map((patient) => (
          <tr key={patient.patientId} className="h-10 group">
            <Cell className="w-1/2">
              {patient.name}
            </Cell>
            <Cell className="w-1/4">
              <input type="date" value={patient.birth} className="bg-transparent text-center" disabled />
            </Cell>
            <Cell>
              {patient.attendances[0]?.attendanceNumber}
            </Cell>
            <Cell className="border-none">
              <button type="button" onClick={() => onSelectPatient(patient)}>
                <img src={scheduleImg} className="w-8 m-auto" alt="" />
              </button>
            </Cell>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function ListAttendances() {
  const [lastAttendances, setLastAttendances] = useState<Patient[]>([]);

  const [searchedPatients, setSearchedPatients] = useState<Patient[]>([]);

  const [selectedDate, setSelectedDate] = useState(getDate(new Date()));

  const [selectedPatient, setSelectedPatient] = useState<Patient>();
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor>();
  const [attendanceDate, setAttendanceDate] = useState<Date>();

  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const patientSearch = useForm<SearchPatientQueryDto>({
    defaultValues: {},
  });

  useEffect(() => {
    const fetchData = async () => {
      const query = DEBUG_MODE ? {} : { attendanceDate: selectedDate };
      const res = await patientService.searchPatients(query);
      console.log(res);

      setLastAttendances(res.result);
    };
    fetchData();
  }, [selectedDate]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await doctorsService.getAll();
      setDoctors(response.result);
    };
    fetchData();
  }, []);

  const handleSearchPatients = async (data: SearchPatientQueryDto) => {
    const query = { ...data };
    if (!query.attendanceNumber) {
      delete query.attendanceNumber;
    }
    const res = await patientService.searchPatients(query);

    setSearchedPatients(res.result);
  };

  const handleSelectPatient = (patient:Patient) => {
    setSelectedPatient(patient);
  };

  const handleSelectDoctorById = (id : string) => {
    const doctor = doctors.find((d) => d.doctorId === id);
    if (doctor) {
      setSelectedDoctor(doctor);
    }
  };

  const handleResetAttendance = () => {
    console.log('limpa');
    setSelectedPatient(undefined);
    setSelectedDoctor(undefined);
    console.log(selectedPatient);
  };

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const onChange = (dates: any) => {
    console.log(dates);
  };

  const filterDate = (date) => {
    const day = getDay(date);
    const weekDays = selectedDoctor?.schedules.map((s) => s.weekDay) || [];
    return weekDays.includes(day);
  };

  return (
    <Panel>
      <PanelHeader>
        <span>{'Pacientes do dia:  '}</span>

        <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="bg-transparent" />
      </PanelHeader>
      <PanelContent>
        <AttendanceTable patients={lastAttendances} onSelectPatient={handleSelectPatient} />
      </PanelContent>
      <PanelSubHeader>
        <div className="grid grid-cols-12 gap-2">
          <Input md={6} label="Nome:" {...patientSearch.register('name')} className="bg-transparent" />
          <Input md={3} label="CPF:" {...patientSearch.register('cpf')} className="bg-transparent" />
          <Input md={3} label="CNS:" {...patientSearch.register('cns')} className="bg-transparent" />

          <Input md={5} label="Data de atendimento:" {...patientSearch.register('attendanceDate')} className="bg-transparent" type="date" />
          <Input md={5} label="Nº do atendimento:" {...patientSearch.register('attendanceNumber', { valueAsNumber: true })} className="bg-transparent" />
          <Button
            variant="small"
            onClick={patientSearch.handleSubmit(handleSearchPatients)}
          >
            Buscar
          </Button>
        </div>
      </PanelSubHeader>
      <PanelContent>
        <AttendanceTable patients={searchedPatients} onSelectPatient={handleSelectPatient} />
      </PanelContent>
      <PanelSubHeader>
        <div className="grid grid-cols-12 gap-2">
          <Input md={6} label="Nome:" value={selectedPatient ? selectedPatient?.name : ''} className="bg-transparent" disabled />
          <Input md={3} label="Nascimento:" value={selectedPatient ? selectedPatient?.birth : ''} type="date" disabled className="bg-transparent" />
          <Input md={3} label="CNS:" value={selectedPatient ? selectedPatient?.cns : ''} className="bg-transparent" disabled />

          <Input md={3} placeholder="Especialidade" value={selectedDoctor ? selectedDoctor?.specialty : ''} className="bg-transparent" disabled />

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

          <div className="flex justify-center gap-10 py-8 w-full col-span-12">
            <Button
              variant="small"
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
        <div className="flex justify-evenly">
          <DatePicker
            locale="pt-BR"
            selected={attendanceDate}
            onChange={(date) => setAttendanceDate(date)}
            inline
            filterDate={filterDate}
            dateFormat="yyyy-MM-dd"
            minDate={new Date()}
          />
          <div>
            asd
          </div>
        </div>
      </PanelSubHeader>
    </Panel>
  );
}

export default ListAttendances;
