import Input from "../../components/Input";
import Button from "../../components/Button";
import { useForm, SubmitHandler } from "react-hook-form";

import { ICreatePatient } from "../../../../backend/src/shared/interfaces/create-patient.interface";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { specialties } from "./data";
import { UserRole } from "../../types/backend.enums";
import EmployeeService from "../../service/employee.service";
import { ICreateEmployeeDTO } from "../../types/backend.interfaces";
import { useAuth } from "../../context/AuthContext";

function CreateEmployee() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { register, handleSubmit, reset } = useForm<ICreateEmployeeDTO>({
    defaultValues: { hospitalId: user?.employee.hospital.hospitalId , user:{password: '123456'}},
  });

  const [errors, setErrors] = useState<string[]>([]);


  const onSubmit: SubmitHandler<ICreatePatient> = async (data) => {
    setErrors([]);
    console.log(data);

    const result = await EmployeeService.create(data);
    if (result.error) {
      setErrors(result.message);
      return;
    }
    navigate("/admin/pacientes");
  };

  return (
    <div className="w-full">
      <div className="max-w-5xl m-auto pt-20">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-10"
        >
          <div className="grid grid-cols-12 gap-2">
            <Input md={4} label="Nome:" {...register("name")}></Input>
            <Input md={5} label="Email:" {...register("user.email")}></Input>
            <Input md={3} label="CPF:" {...register("cpf")}></Input>

            <Input md={4} label="RG:" {...register("rg")}></Input>
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
            ></Input>
            <Input md={3} label="Doc. N°:" {...register("doctor.crm")}></Input>
            <Input md={3} label="CNS:" {...register("cns")}></Input>
            <Input md={3} label="Mat:" {...register("mat")}></Input>

            <Input md={3} label="CEP:" {...register("address.cep")}></Input>
            <Input
              md={4}
              label="Endereço:"
              {...register("address.street")}
            ></Input>
            <Input
              md={1}
              label="N°:"
              {...register("address.streetNumber")}
            ></Input>

            <Input
              md={4}
              label="Estado:"
              {...register("address.stateId")}
            ></Input>

            <Input
              md={6}
              label="Município:"
              {...register("address.cityId")}
            ></Input>
            <Input
              md={6}
              label="Bairro:"
              {...register("address.district")}
            ></Input>
          </div>
          <div className="flex gap-6 justify-center">
            <Button type="submit">Incluir</Button>
            <Button onClick={() => reset()}>Limpar</Button>
          </div>
          <div className="flex flex-col">
            {errors.map((error) => (
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
