import { useForm, Controller } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';

import { useEffect, useState } from 'react';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { UserRole } from '../../types/backend.enums';
import { City, Employee, State } from '../../types/backend.models';
import citiesService from '../../service/cities.service';
import Button from '../../components/Button';
import Input from '../../components/Input';
import specialties from './data';

interface Props {
  employee?: Employee;
  handleFormSubmit: (employee: Employee) => void;
  schema: Record<string, any>;

  isUpdating?: boolean;
}

function EmployeeForm({
  employee,
  handleFormSubmit,
  schema,
  isUpdating,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
    clearErrors,
    watch,
  } = useForm<Employee>({
    defaultValues: employee,
    resolver: yupResolver(yup.object().shape(schema).required()),
  });

  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);

  const [isLoadingStates, setIsLoadingStates] = useState(true);
  const [, setIsLoadingCities] = useState(false);

  const loadCities = async (stateId: number) => {
    setIsLoadingCities(true);
    const citiesRes = await citiesService.getCities(stateId);
    if (citiesRes.error) {
      return;
    }
    setCities(citiesRes);
    setIsLoadingCities(false);
  };

  const onRoleChange = (e: any) => {
    const newRole = e.target.value as UserRole;
    setValue('user.role', newRole);
    if (newRole !== UserRole.Medico) {
      setValue('doctor', undefined);
      clearErrors('doctor');
    }
    if (newRole) {
      clearErrors('user.role');
    }
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
      reset(employee);
    };
    fetchStates();
  }, [employee, reset]);

  const onChangeSelectedState = async (e: any) => {
    const stateId = e.target.value;
    setValue('address.stateId', Number(stateId));
    setValue('address.cityId', '' as any as number);
    clearErrors('address.stateId');

    if (stateId) {
      loadCities(stateId);
    }
  };

  const role = watch('user.role');

  return (
    <div className="w-full">
      <div className="max-w-5xl m-auto pt-20">
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex flex-col gap-10"
        >
          <div className="grid grid-cols-12 gap-2">
            <Input
              md={4}
              label="Nome:"
              {...register('name')}
              error={errors.name}
            />
            <Input
              md={5}
              label="Email:"
              {...register('user.email')}
              error={errors.user?.email}
            />
            <Controller
              control={control}
              name="cpf"
              render={({ field: { onChange, name, value } }) => (
                <Input md={3} label="CPF:" asChild error={errors.cpf}>
                  <PatternFormat
                    format="###.###.###-##"
                    name={name}
                    value={value}
                    onValueChange={(v) => {
                      onChange({ target: { value: v.value } });
                    }}
                  />
                </Input>
              )}
            />

            <Input
              md={3}
              label="Mat:"
              {...register('mat')}
              error={errors.mat}
            />

            <Input md={3} label="RG:" {...register('rg')} error={errors.rg} />
            <Input
              md={3}
              label="CNS:"
              {...register('cns')}
              error={errors.cns}
            />

            <Input md={3} label="Cargo:" asChild error={errors?.user?.role}>
              <select
                defaultValue=""
                onChange={onRoleChange}
                value={role}
              >
                <option hidden value="">
                  {' '}
                </option>
                {Object.values(UserRole).map((userRole) => (
                  <option key={userRole} value={userRole}>
                    {userRole}
                  </option>
                ))}
              </select>
            </Input>

            {watch('user.role') === UserRole.Medico && (
              <>
                <Input
                  md={4}
                  label="Especialidade:"
                  {...register('doctor.specialty')}
                  asChild
                >
                  <select defaultValue="">
                    <option hidden value="">
                      {' '}
                    </option>
                    {specialties.map((specialty: string) => (
                      <option key={specialty} value={specialty}>
                        {specialty}
                      </option>
                    ))}
                  </select>
                </Input>

                <Input
                  md={4}
                  label="CRM:"
                  {...register('doctor.crm')}
                  error={errors.doctor?.crm}
                />
                <Input
                  md={4}
                  label="Estado CRM:"
                  {...register('doctor.crmStateId', { valueAsNumber: true })}
                  error={errors.doctor?.crmStateId}
                  asChild
                >
                  <select>
                    <option hidden value="">
                      {' '}
                    </option>
                    {states.map((state) => (
                      <option key={state.stateId} value={state.stateId}>
                        {state.abbreviation}
                      </option>
                    ))}
                  </select>
                </Input>
              </>
            )}

            <Controller
              control={control}
              name="address.cep"
              render={({ field: { onChange, name, value } }) => (
                <Input md={2} label="CEP:" asChild error={errors.address?.cep}>
                  <PatternFormat
                    format="##.###-###"
                    name={name}
                    value={value}
                    onValueChange={(v) => {
                      onChange({ target: { value: v.value } });
                    }}
                  />
                </Input>
              )}
            />
            <Input
              md={6}
              label="Endereço:"
              {...register('address.street')}
              error={errors.address?.street}
            />
            <Input
              md={1}
              label="N°:"
              {...register('address.streetNumber')}
              error={errors.address?.streetNumber}
            />
            <Input
              md={3}
              label="Estado:"
              asChild
              onChange={onChangeSelectedState}
              error={errors.address?.stateId}
              isLoading={isLoadingStates}
            >
              <select {...register('address.stateId')}>
                <option hidden value="">
                  {' '}
                </option>
                {states.map((state) => (
                  <option key={state.stateId} value={state.stateId}>
                    {state.abbreviation}
                  </option>
                ))}
              </select>
            </Input>

            <Input
              md={6}
              label="Município:"
              asChild
              {...register('address.cityId', { valueAsNumber: true })}
              error={errors.address?.cityId}
            >
              <select>
                <option hidden value="">
                  {' '}
                </option>
                {cities.map((city) => (
                  <option key={city.cityId} value={city.cityId}>
                    {city.name}
                  </option>
                ))}
              </select>
            </Input>
            <Input
              md={6}
              label="Bairro:"
              {...register('address.district')}
              error={errors.address?.district}
            />
          </div>
          <div className="flex gap-6 justify-center">
            <Button type="submit">Incluir</Button>
            <Button onClick={() => reset()}>Limpar</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EmployeeForm;
