import Input from "../../components/Input";
import Button from "../../components/Button";
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';


import {Race} from '../../../../backend/src/shared/enums/race.enum'
import {Gender} from '../../../../backend/src/shared/enums/gender.enum'
import {MaritalState} from '../../../../backend/src/shared/enums/marital-states.enum'

import { classValidatorResolver } from '@hookform/resolvers/class-validator';

import patientService from "../../service/patient.service";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { City, State } from "types/backend.models";

import citiesService from "../../service/cities.service";

import { ICreatePatientDTO } from "../../../../backend/src/shared/interfaces/create-patient.interface";

import { CreatePatientDto } from "../../types/backend.dtos";

const resolver = classValidatorResolver(CreatePatientDto, {transformer: {enableImplicitConversion: true , ignoreDecorators: true}, validator: {forbidNonWhitelisted: true}});

function CreatePatient() {

  const navigate = useNavigate()
  const {
    register, handleSubmit, reset, setValue, control, formState: { errors }
  } = useForm<CreatePatientDto>({
    defaultValues: {address: {}},
    resolver: (...a)=> { return resolver(...a)}}
    // resolver: (...a)=> { return resolver(...a)}}
  );

  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);

  const [errorsBack, setErrorsBack] = useState<string[]>([])

  useEffect(() => {
    const fetchStates = async () => {
      const statesRes = await citiesService.getAllStates();
      if(statesRes.error){
        return
      }
      setStates(statesRes)
    }
    fetchStates()
  },[])

  const onChangeSelectedState = async (e:any) => {
    const stateId = e.target.value;
    setValue('address.stateId', Number(stateId));
    setValue('address.cityId', '');

    if(stateId){
      const citiesRes = await citiesService.getCities(stateId);
      if(citiesRes.error){
        return
      }
      setCities(citiesRes)
    }
  } 

  console.log(errors?.address)

  const onSubmit: SubmitHandler<ICreatePatientDTO> = async (data) => {
    setErrorsBack([]);
    console.log(data);
    
    const result = await patientService.create(data);
    if(result.error){
      setErrorsBack(result.message)
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
           
              <Input md={9} label="Nome:" {...register('name')} error={errors?.name} ></Input>
              <Input md={3} label="Nascimento:" {...register('birth')} type="date" error={errors?.birth} ></Input>
            
              <Controller
                control={control}
                name="cpf"
                render={({ field: { onChange, name, value } }) => (
                  <Input md={3} label="CPF:" asChild error={errors?.cpf}  >
                    <PatternFormat
                      format="###.###.###-##"
                      name={name}
                      value={value}
                      // onChange={onChange}
                      onValueChange={v => {onChange({target:{value: v.value}})}}
                    />
                  </Input>
                )}
              />
              <Input md={2} label="RG:"{...register('rg')} error={errors?.rg}  ></Input>
              <Input md={3} label="CNS:" {...register('cns')} error={errors?.cns} ></Input>
              <Input md={4} label="Profissão:" {...register('occupation')} error={errors?.occupation} ></Input>

              <Input md={12} label="Responsável:" {...register('responsible')} error={errors?.responsible} ></Input>
              <Input md={12} label="Mãe:" {...register('mother')} error={errors?.mother} ></Input>
              <Input md={12} label="Pai:" {...register('father')} error={errors?.father}  ></Input>

              <Input md={2} label="Sexo:" {...register('gender')} error={errors?.gender}  asChild>
                <select defaultValue={''}>
                    {
                      Object.values(Gender).map(gender => ( 
                        <option key={gender} value={gender}>{gender}</option>
                      ))
                    }
                </select>
              </Input>
              <Input md={3} label="Raça/Cor:" {...register('race')} asChild error={errors?.race} >
                <select>
                    {
                      Object.values(Race).map(race => ( 
                        <option key={race} value={race} className="bg-transparent appearance-none">{race}</option>
                      ))
                    }
                </select>
              </Input>
              <Input md={1} label="Idade:"  ></Input>
              <Input md={3} label="Naturalidade:" {...register('placeOfBirth')} error={errors?.placeOfBirth} ></Input>
              <Input md={3} label="Est Civil:" {...register('maritalState')} asChild  error={errors?.maritalState} >
                <select >
                    {
                      Object.values(MaritalState).map(maritalState => ( 
                        <option key={maritalState} value={maritalState}>{maritalState}</option>
                      ))
                    }
                </select>
              </Input>
              <Input md={7} label="Endereço:" {...register('address.street')} error={errors?.address?.street}  ></Input>
              <Input md={1} label="N°:" {...register('address.streetNumber')} error={errors?.address?.streetNumber}></Input>

              <Controller
                control={control}
                name="address.cep"
                render={({ field: { onChange, name, value } }) => (
                  <Input md={2} label="CEP:"  asChild  error={errors?.address?.cep}>
                    <PatternFormat
                      format="##.###-###"
                      name={name}
                      value={value}
                      onValueChange={v => {onChange({target:{value: v.value}})}}
                    />
                  </Input>
                )}
              />
              <Controller
                control={control}
                name="phone"
                render={({ field: { onChange, name, value } }) => (
                  <Input md={2} label="Tel:"  asChild  error={errors?.phone}>
                    <PatternFormat
                      format="(##) #########"
                      name={name}
                      value={value}
                      onValueChange={v => {onChange({target:{value: v.value}})}}
                    />
                  </Input>
                )}
              />
              

              <Input md={3} label="Estado:" asChild  onChange={onChangeSelectedState} error={errors?.address?.stateId}>
                <select >
                  <option value={''} >Selecione um Estado</option> 
                  {
                    states.map(state => ( 
                      <option key={state.stateId} value={state.stateId}>{state.abbreviation}</option>
                    ))
                  }
                </select>
              </Input>
              <Input md={4} label="Município:"  asChild {...register('address.cityId', {valueAsNumber: true})} error={errors?.address?.cityId} >
                <select >
                  <option value={''} >Selecione um Município</option> 
                  {
                    cities.map(city => ( 
                      <option key={city.cityId} value={city.cityId}>{city.name}</option>
                    ))
                  }
                </select>
              </Input>
              <Input md={5} label="Bairro:" {...register('address.district')} error={errors?.address?.district}></Input>
          </div>

          <div className="flex gap-6 justify-center">
            <Button type="submit">Incluir</Button>
            <Button onClick={()=> reset()}>Limpar</Button>
          </div>
          <div className="flex flex-col">
            {errorsBack.map && errorsBack.map((error) => <span key={error} className="text-red-500">{error}</span>)}
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePatient;
