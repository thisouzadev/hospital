import Input from "../../components/Input";
import Button from "../../components/Button";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { specialties } from "./data";
import { UserRole } from "../../types/backend.enums";
import EmployeeService from "../../service/employee.service";
import { ICreateEmployeeDTO } from "../../types/backend.interfaces";
import { useAuth } from "../../context/AuthContext";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { City, State } from "types/backend.models";
import citiesService from "../../service/cities.service";
import { PatternFormat } from "react-number-format";

const schema = yup.object().shape({
  user: yup.object().shape({
    password: yup.string().required(),
    email: yup.string().email().required(),
    role: yup.string().required(),
  }),
  name: yup.string().required(),
  cpf: yup.string().required(),
  rg: yup.string().required(),
  doctor: yup.object().shape({
    specialty: yup.string().required(),
    crm: yup.string().required(),
  }),
  cns: yup.string().required(),
  mat: yup.string().required(),
  address: yup.object().shape({
    cep: yup.string().length(8).required(),
    street: yup.string().required(),
    streetNumber: yup.string().required(),
    cityId: yup.number().required(),
    district: yup.string().required(),
    stateId: yup.number().required(),
  }),
});
function CreateEmployee() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<ICreateEmployeeDTO>({
    resolver: yupResolver(schema),
    defaultValues: {
      hospitalId: user?.employee.hospital.hospitalId,
      user: { password: "123456" },
    },
  });

  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [errorsBack, setErrorsBack] = useState<string[]>([]);
  const { employeeId } = useParams();

  const onSubmit: SubmitHandler<ICreateEmployeeDTO> = async (data) => {
    setErrorsBack([]);
    console.log(data);

    const result = await EmployeeService.create(data);
    if (result.error) {
      setErrorsBack(result.message);
      return;
    }
    navigate("/admin/pacientes");
  };

  useEffect(() => {
    const fetchStates = async () => {
      const statesRes = await citiesService.getAllStates();

      if (statesRes.error) {
        return;
      }
      setStates(statesRes);
    };

    const fetchEmployee = async () => {
      if (!employeeId) {
        return;
      }
      const employeeData = await EmployeeService.getOne(employeeId);
      console.log(employeeData);
      reset(employeeData);
    };
    fetchStates();
    if (employeeId) {
      fetchEmployee();
    }
  }, [employeeId]);

  const onChangeSelectedState = async (e: any) => {
    const stateId = e.target.value;
    setValue("address.stateId", Number(stateId));
    setValue("address.cityId", "" as any as number);

    if (stateId) {
      const citiesRes = await citiesService.getCities(stateId);
      if (citiesRes.error) {
        return;
      }
      setCities(citiesRes);
    }
  };

  // console.log("hospitalId -->", user);
  return (
    <div className="w-full">
      <div className="max-w-5xl m-auto pt-20">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-10"
        >
          <div className="grid grid-cols-12 gap-2">
            <Input
              md={4}
              label="Nome:"
              {...register("name")}
              error={errors.name}
            ></Input>
            <Input
              md={5}
              label="Email:"
              {...register("user.email")}
              error={errors.email}
            ></Input>
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
              md={4}
              label="RG:"
              {...register("rg")}
              error={errors.rg}
            ></Input>
            <Input md={4} label="Cargo:" {...register("user.role")} asChild>
              <select defaultValue={""}>
                {Object.values(UserRole).map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </Input>
            <Input
              md={4}
              label="Especialidade:"
              {...register("doctor.specialty")}
              asChild
            >
              <select defaultValue={""}>
                {specialties.map((specialtie) => (
                  <option key={specialtie} value={specialtie}>
                    {specialtie}
                  </option>
                ))}
              </select>
            </Input>

            <Input
              md={3}
              label="Doc. MED/Tipo:"
              {...register("doctor.crm")}
              error={errors.doctor?.crm}
            ></Input>
            <Input
              md={3}
              label="Doc. N°:"
              {...register("doctor.crm")}
              error={errors.doctor?.crm}
            ></Input>
            <Input
              md={3}
              label="CNS:"
              {...register("cns")}
              error={errors.cns}
            ></Input>
            <Input
              md={3}
              label="Mat:"
              {...register("mat")}
              error={errors.mat}
            ></Input>

            <Controller
              control={control}
              name="address.cep"
              render={({ field: { onChange, name, value } }) => (
                <Input md={3} label="CEP:" asChild error={errors.address?.cep}>
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
              md={5}
              label="Endereço:"
              {...register("address.street")}
              error={errors.address?.street}
            ></Input>
            <Input
              md={1}
              label="N°:"
              {...register("address.streetNumber")}
              error={errors.address?.streetNumber}
            ></Input>
            <Input
              md={3}
              label="Estado:"
              asChild
              onChange={onChangeSelectedState}
              error={errors.address?.stateId}
            >
              <select>
                <option value={""}>Selecione um Estado</option>
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
              {...register("address.cityId", { valueAsNumber: true })}
              error={errors.address?.cityId}
            >
              <select>
                <option value={""}>Selecione um Município</option>
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
              {...register("address.district")}
              error={errors.address?.district}
            ></Input>
          </div>
          <div className="flex gap-6 justify-center">
            <Button type="submit">Incluir</Button>
            <Button onClick={() => reset()}>Limpar</Button>
          </div>
          <div className="flex flex-col">
            {errorsBack.map &&
              errorsBack.map((error) => (
                <span key={error} className="text-red-500">
                  {error}
                </span>
              ))}
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateEmployee;
