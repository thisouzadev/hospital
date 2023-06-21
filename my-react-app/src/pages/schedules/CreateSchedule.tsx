import Input from "../../components/Input";
import Button from "../../components/Button";
import { useForm, SubmitHandler,  } from 'react-hook-form';

import {ICreateScheduleDto} from '../../types/backend.interfaces'

import patientService from "../../service/patient.service";
import { useEffect, useState } from "react";
import Header from "../patients/Header";
import { useNavigate } from "react-router-dom";
import { Race } from "../../../../backend/src/shared/enums/race.enum";
import doctorsService from "../../service/doctors.service";
import scheduleService from "../../service/schedule.service";

function CreateSchedule() {
  const navigate = useNavigate()
  const {
    register, handleSubmit, reset,setValue
  } = useForm<ICreateScheduleDto>({
    defaultValues: {doctorId: ''},
  });

  const [errors, setErrors] = useState<string[]>([])


  const [doctors, setDoctors] = useState<any[]>([])

  const [patient, setPatient] = useState<any>(null)
  const [cpf, setCpf] = useState('')




  useEffect(()=> {
    const fetchData = async () => {
      const response = await doctorsService.getAll()
      setDoctors(response)
    }
    fetchData()
  },[])

  const handleCpfChange = async (e:any)=> {
    const newCpf = e.target.value;

    if(newCpf.length <= 11){
      setCpf(newCpf);
    }

    if(newCpf.length === 11){
      const response = await patientService.getByCPF(newCpf);
      if(response.error){
        setErrors([response.message])
        setPatient(null)
        return
      }
      setPatient(response);
      setErrors([]);
      setValue('patientId', patient.patientId)
    }
  }

  const onSubmit: SubmitHandler<ICreateScheduleDto> = async (data) => {
    setErrors([]);
    console.log(data)
    const result = await scheduleService.create(data);
    if(result.error){
      setErrors(result.message)
      return;
    }
    navigate('/admin/pacientes')
  };

  const onResetClick = ()=> {
    setCpf('')
    setPatient({})
    setErrors([])
    reset()
  }

  return (
    <div className="w-full">
      <Header></Header>
      <div className="max-w-5xl m-auto pt-20">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
          <div className="grid grid-cols-12 gap-2">

              <Input md={6} label="CPF:" value={cpf} onChange={handleCpfChange} ></Input>
              <Input md={6} label="CNS:" className="mb-10"></Input>

              <Input md={9} label="Nome:" disabled value={patient? patient?.name : ''} ></Input>
              <Input md={3} label="Nascimento:" type="date" className="mb-10" disabled value={patient?.birth}></Input>

              <Input md={6} label="Agendamento:" type="Date" {...register('scheduleDate')} ></Input>
              <Input md={6} label="Médico:" asChild {...register('doctorId')}>
                <select defaultValue={''}>
                  <option  value={''} className="bg-transparent appearance-none" disabled>Selection um médico</option>
                  {
                    doctors.map(doctor => ( 
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

export default CreateSchedule;
