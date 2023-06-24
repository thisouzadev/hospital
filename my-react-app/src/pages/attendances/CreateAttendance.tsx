import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Doctor, Patient } from 'types/backend.models';
import { PatternFormat } from 'react-number-format';
import Input from '../../components/Input';
import Button from '../../components/Button';

import patientService from '../../service/patient.service';
import doctorsService from '../../service/doctors.service';
import attendanceService from '../../service/attendance.service';
import { CreateAttendanceDto } from '../../types/backend.dtos';

function CreateAttendance() {
  const navigate = useNavigate();
  const {
    register, handleSubmit, reset, setValue,
  } = useForm<CreateAttendanceDto>({
  });

  const [errors, setErrors] = useState<string[]>([]);

  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const [patient, setPatient] = useState<Patient>();

  const [cpf, setCpf] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await doctorsService.getAll();
      setDoctors(response);
    };
    fetchData();
  }, []);

  const handleCpfChange = async (newCpf:string) => {
    // const newCpf = e.target.value;

    if (newCpf.length <= 11) {
      setCpf(newCpf);
    }

    if (newCpf.length === 11) {
      const response = await patientService.getByCPF(newCpf);
      if (response.error) {
        setErrors([response.message]);
        setPatient(undefined);
        return;
      }
      setPatient(response);
      setErrors([]);
      setValue('patientId', response.patientId);
    } else {
      setPatient(undefined);
      setValue('patientId', '');
    }
  };

  const onSubmit = async (data: CreateAttendanceDto) => {
    setErrors([]);

    if (!data.doctorId) {
      // eslint-disable-next-line no-param-reassign
      delete data.doctorId;
    }

    const result = await attendanceService.create(data);
    if (result.error) {
      setErrors(result.message);
      return;
    }
    navigate('/admin/agendamentos');
  };

  const onResetClick = () => {
    setCpf('');
    setPatient(undefined);
    setErrors([]);
    reset();
  };

  return (
    <div className="w-full">
      <div className="max-w-5xl m-auto pt-20">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
          <div className="grid grid-cols-12 gap-2">

            <Input md={6} label="CPF:" asChild>
              <PatternFormat
                format="###.###.###-##"
                value={cpf}
                  // onChange={onChange}
                onValueChange={(v) => { handleCpfChange(v.value); }}
              />
            </Input>
            <Input md={6} label="CNS:" className="mb-10" />

            {patient
                && (
                <>
                  <Input md={9} label="Nome:" disabled value={patient ? patient?.name : ''} />
                  <Input md={3} label="Nascimento:" type="date" className="mb-10" disabled value={patient?.birth} />
                </>
                )}

            <Input md={6} label="Agendamento:" type="Date" {...register('attendanceDate')} />
            <Input md={6} label="Médico:" asChild {...register('doctorId')}>
              <select defaultValue="">
                <option value="" className="bg-transparent appearance-none" disabled>Selection um médico</option>
                {
                    doctors.map((doctor) => (
                      <option key={doctor.doctorId} value={doctor.doctorId} className="bg-transparent appearance-none">{doctor.employee.name}</option>
                    ))
                  }
              </select>
            </Input>

          </div>
          <div className="flex gap-6 justify-center">
            <Button type="submit">Incluir</Button>
            <Button onClick={onResetClick}>Limpar</Button>
          </div>
          <div className="flex flex-col">
            {errors.map((error) => <span key={error} className="text-red-500">{error}</span>)}
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateAttendance;
