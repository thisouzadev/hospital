import { useForm, Controller } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';

import { useEffect, useState } from 'react';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Race } from '@shared/enums/race.enum';
import { City, Patient, State } from '../../types/backend.models';
import citiesService from '../../service/cities.service';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Gender, MaritalState } from '../../types/backend.enums';

interface Props {
  patient?: Patient
  handleFormSubmit: (patient:Patient)=>void
  schema: Record<string, any>,

  isUpdating?:boolean
}

function PatientForm({
  patient, handleFormSubmit, schema, isUpdating,
}:Props) {
  const {
    register, handleSubmit, reset, setValue, control, formState: { errors }, clearErrors, watch,
  } = useForm<Patient>({
    defaultValues: patient,
    resolver: yupResolver(yup.object().shape(schema).required()),
  });

  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);

  const [isLoadingStates, setIsLoadingStates] = useState(true);
  const [isLoadingCities, setIsLoadingCities] = useState(false);

  const loadCities = async (stateId: number) => {
    setIsLoadingCities(true);
    const citiesRes = await citiesService.getCities(stateId);
    if (citiesRes.error) {
      return;
    }
    setCities(citiesRes);
    setIsLoadingCities(false);
  };

  useEffect(() => {
    const fetchStates = async () => {
      const statesRes = await citiesService.getAllStates();
      if (statesRes.error) {
        return;
      }
      setStates(statesRes);
      setIsLoadingStates(false);
      const stateId = watch('address.stateId');
      if (isUpdating && stateId) {
        await loadCities(stateId);
      }
      reset(patient);
    };
    fetchStates();
  }, [patient, reset]);

  const onChangeSelectedState = async (e:any) => {
    const stateId = e.target.value;
    setValue('address.stateId', Number(stateId));
    setValue('address.cityId', '' as any as number);
    clearErrors('address.stateId');

    if (stateId) {
      loadCities(stateId);
    }
  };

  return (
    <div className="w-full">
      <div className="max-w-5xl m-auto pt-20">
        <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-10">
          <div className="grid grid-cols-12 gap-2">
            <Input md={3} label="Data:" />
            <Input md={3} label="Prontuário:" />
            <Input md={3} label="Especialidade:" />
            <Input md={3} label="Usuário:" />

            <Input md={9} label="Nome:" {...register('name')} error={errors.name} />
            <Input md={3} label="Nascimento:" {...register('birth')} type="date" error={errors.birth} />

            <Controller
              control={control}
              name="cpf"
              render={({ field: { onChange, name, value } }) => (
                <Input md={3} label="CPF:" asChild error={errors.cpf}>
                  <PatternFormat
                    format="###.###.###-##"
                    name={name}
                    value={value}
                      // onChange={onChange}
                    onValueChange={(v) => { onChange({ target: { value: v.value } }); }}
                  />
                </Input>
              )}
            />
            <Input md={2} label="RG:" {...register('rg')} error={errors.rg} />
            <Input md={3} label="CNS:" {...register('cns')} error={errors.cns} />
            <Input md={4} label="Profissão:" {...register('occupation')} error={errors.occupation} />

            <Input md={12} label="Responsável:" {...register('responsible')} error={errors.responsible} />
            <Input md={12} label="Mãe:" {...register('mother')} error={errors.mother} />
            <Input md={12} label="Pai:" {...register('father')} error={errors.father} />

            <Input md={2} label="Sexo:" {...register('gender')} error={errors.gender} asChild>
              <select>
                <option hidden value="">{' '}</option>
                {
                      Object.values(Gender).map((gender) => (
                        <option key={gender} value={gender}>{gender}</option>
                      ))
                    }
              </select>
            </Input>
            <Input md={3} label="Raça/Cor:" {...register('race')} asChild error={errors.race}>
              <select>
                <option hidden value="">{' '}</option>
                {
                        Object.values(Race).map((race) => (
                          <option key={race} value={race} className="bg-transparent appearance-none">{race}</option>
                        ))
                    }
              </select>
            </Input>
            <Input md={1} label="Idade:" />
            <Input md={3} label="Naturalidade:" {...register('placeOfBirth')} error={errors.placeOfBirth} />
            <Input md={3} label="Est Civil:" {...register('maritalState')} asChild error={errors.maritalState}>
              <select placeholder="Selecione um município">
                <option hidden value="">{' '}</option>
                {
                    Object.values(MaritalState).map((maritalState) => (
                      <option key={maritalState} value={maritalState}>{maritalState}</option>
                    ))
                  }
              </select>
            </Input>
            <Input md={7} label="Endereço:" {...register('address.street')} error={errors.address?.street} />
            <Input md={1} label="N°:" {...register('address.streetNumber')} error={errors.address?.streetNumber} />

            <Controller
              control={control}
              name="address.cep"
              render={({ field: { onChange, name, value } }) => (
                <Input md={2} label="CEP:" asChild error={errors.address?.cep}>
                  <PatternFormat
                    format="##.###-###"
                    name={name}
                    value={value}
                    onValueChange={(v) => { onChange({ target: { value: v.value } }); }}
                  />
                </Input>
              )}
            />
            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, name, value } }) => (
                <Input md={2} label="Tel:" asChild error={errors.phone}>
                  <PatternFormat
                    format="(##) #########"
                    name={name}
                    value={value}
                    onValueChange={(v) => { onChange({ target: { value: v.value } }); }}
                  />
                </Input>
              )}
            />

            <Input md={3} label="Estado:" asChild onChange={onChangeSelectedState} error={errors.address?.stateId} isLoading={isLoadingStates}>
              <select {...register('address.stateId', { valueAsNumber: true })}>
                <option hidden value="">{' '}</option>
                {
                    states.map((state) => (
                      <option
                        key={state.stateId}
                        value={state.stateId}
                      >
                        {state.abbreviation}
                      </option>
                    ))
                  }
              </select>
            </Input>
            <Input md={4} label="Município:" asChild error={errors.address?.cityId} isLoading={isLoadingCities}>
              <select {...register('address.cityId', { valueAsNumber: true })}>
                <option hidden value="">{' '}</option>
                {
                    cities.map((city) => (
                      <option key={city.cityId} value={city.cityId}>{city.name}</option>
                    ))
                  }
              </select>
            </Input>
            <Input md={5} label="Bairro:" {...register('address.district')} error={errors.address?.district} />
          </div>

          <div className="flex gap-6 justify-center">
            <Button type="submit">{isUpdating ? 'Salvar' : 'Incluir'}</Button>
            {!isUpdating
              && <Button onClick={() => reset()}>Limpar</Button>}
          </div>

        </form>
      </div>
    </div>
  );
}

export default PatientForm;
