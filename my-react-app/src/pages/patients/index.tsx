import Input from "../../components/Input";
import Button from "../../components/Button";
import { useForm, SubmitHandler,  } from 'react-hook-form';

import PatientService from '../../service/patient.service'

import {ICreatePatient} from '../../../../backend/src/shared/interfaces/create-patient.interface'

function Patients() {
  const {
    register, handleSubmit, reset
  } = useForm<ICreatePatient>({
    // defaultValues: curriculum,
  });

  const onSubmit: SubmitHandler<ICreatePatient> = (data) => (new PatientService).create(data);

  return (
    <div className="w-full mt-20">
      <div className="max-w-5xl m-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
          <div className="grid grid-cols-12 gap-2">
           
              <Input md={3} label="Data:"  ></Input>
              <Input md={3} label="Prontuário:"></Input>
              <Input md={3} label="Especialidade:"></Input>
              <Input md={3} label="Usuário:"></Input>
           
              <Input md={9} label="Nome:" {...register('name')} ></Input>
              <Input md={3} label="Nascimento:" {...register('birth')}></Input>
            
              <Input md={3} label="CPF:" {...register('cpf')} ></Input>
              <Input md={2} label="RG:"{...register('rg')} ></Input>
              <Input md={3} label="CNS:" {...register('cns')}></Input>
              <Input md={4} label="Profissão:" {...register('occupation')}></Input>

              <Input md={12} label="Responsável:" {...register('responsible')}></Input>
              <Input md={12} label="Mãe:" {...register('mother')}></Input>
              <Input md={12} label="Pai:" {...register('father')} ></Input>

              <Input md={2} label="Sexo:" {...register('gender')}></Input>
              <Input md={3} label="Raça/Cor:" {...register('race')}></Input>
              <Input md={1} label="Idade:" ></Input>
              <Input md={3} label="Naturalidade:" {...register('placeOfBirth')}></Input>
              <Input md={3} label="Est Civil:" {...register('maritalState')}></Input>

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
        </form>
      </div>
    </div>
  );
}

export default Patients;
