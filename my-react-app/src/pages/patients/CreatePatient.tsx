import Input from "../../components/Input";
import Button from "../../components/Button";
import { useForm, SubmitHandler,  } from 'react-hook-form';


import {ICreatePatient} from '../../../../backend/src/shared/interfaces/create-patient.interface'

import {Race} from '../../../../backend/src/shared/enums/race.enum'
import {Gender} from '../../../../backend/src/shared/enums/gender.enum'
import {MaritalState} from '../../../../backend/src/shared/enums/marital-states.enum'



import patientService from "../../service/patient.service";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreatePatient() {
  const navigate = useNavigate()
  const {
    register, handleSubmit, reset,
  } = useForm<ICreatePatient>({
    defaultValues: {gender: '', race:'', maritalState: ''},
  });

  const [errors, setErrors] = useState<string[]>([])

  const onSubmit: SubmitHandler<ICreatePatient> = async (data) => {
    setErrors([]);
    const result = await patientService.create(data);
    if(result.error){
      setErrors(result.message)
      return;
    }
    navigate('/admin/pacientes')
  };

  return (
    <div className="w-full">
      <div className="max-w-5xl m-auto pt-20">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
          <div className="grid grid-cols-12 gap-2">
              <Input md={3} label="Data:"  ></Input>
              <Input md={3} label="Prontuário:"></Input>
              <Input md={3} label="Especialidade:"></Input>
              <Input md={3} label="Usuário:"></Input>
           
              <Input md={9} label="Nome:" {...register('name')} ></Input>
              <Input md={3} label="Nascimento:" {...register('birth')} type="date"></Input>
            
              <Input md={3} label="CPF:" {...register('cpf')} ></Input>
              <Input md={2} label="RG:"{...register('rg')} ></Input>
              <Input md={3} label="CNS:" {...register('cns')}></Input>
              <Input md={4} label="Profissão:" {...register('occupation')}></Input>

              <Input md={12} label="Responsável:" {...register('responsible')}></Input>
              <Input md={12} label="Mãe:" {...register('mother')}></Input>
              <Input md={12} label="Pai:" {...register('father')} ></Input>

              <Input md={2} label="Sexo:" {...register('gender')} asChild>
                <select defaultValue={''}>
                    {
                      Object.values(Gender).map(gender => ( 
                        <option key={gender} value={gender}>{gender}</option>
                      ))
                    }
                </select>
              </Input>
              <Input md={3} label="Raça/Cor:" {...register('race')} asChild>
                <select>
                    {
                      Object.values(Race).map(race => ( 
                        <option key={race} value={race} className="bg-transparent appearance-none">{race}</option>
                      ))
                    }
                </select>
              </Input>
              <Input md={1} label="Idade:" ></Input>
              <Input md={3} label="Naturalidade:" {...register('placeOfBirth')}></Input>
              <Input md={3} label="Est Civil:" {...register('maritalState')} asChild >
                <select defaultValue={''}>
                    {
                      Object.values(MaritalState).map(maritalState => ( 
                        <option key={maritalState} value={maritalState}>{maritalState}</option>
                      ))
                    }
                </select>
              </Input>

              <Input md={7} label="Endereço:" ></Input>
              <Input md={1} label="N°:" ></Input>
              <Input md={2} label="CEP:" ></Input>
              <Input md={2} label="Tel:" ></Input>

              <Input md={3} label="Estado:" ></Input>
              <Input md={4} label="Município:" ></Input>
              <Input md={5} label="Bairro:" ></Input>
          </div>
          <div className="flex gap-6 justify-center">
            <Button type="submit">Incluir</Button>
            <Button onClick={()=> reset()}>Limpar</Button>
          </div>
          <div className="flex flex-col">
            {errors.map((error) => <span key={error} className="text-red-500">{error}</span>)}
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePatient;
