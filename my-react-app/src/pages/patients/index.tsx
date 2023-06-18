import Input from "../../components/Input";
import Button from "../../components/Button";
import { useForm, SubmitHandler,  } from 'react-hook-form';

import {ICreatePatient} from '../../../../backend/src/shared/interfaces/create-patient.interface'

function Patients() {
  const {
    register, handleSubmit
  } = useForm<ICreatePatient>({
    // defaultValues: curriculum,
  });

  const onSubmit: SubmitHandler<ICreatePatient> = (data) => console.log(data);

  return (
    <div className="w-full mt-20">
      <div className="max-w-5xl m-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
          <div className="">
            <Input md={4} label="Nome:" {...register('name')} ></Input>
            <Input md={4} label="CPF:" {...register('cpf')}></Input>
            <Input md={4} label="RG:" {...register('rg')}></Input>
          </div>
          <div className="flex gap-6 justify-center">
            <Button type="submit">Incluir</Button>
            <Button>Limpar</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Patients;
