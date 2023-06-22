import Input from "../../components/Input";
import Button from "../../components/Button";
import { useForm, SubmitHandler } from "react-hook-form";

import { ICreatePatient } from "../../../../backend/src/shared/interfaces/create-patient.interface";

import patientService from "../../service/patient.service";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { specialties } from "./data";
import { UserRole } from "../../types/backend.enums";

function CreateEmployee() {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<ICreatePatient>({
    defaultValues: { gender: "", race: "", maritalState: "" },
  });

  const [errors, setErrors] = useState<string[]>([]);

  const onSubmit: SubmitHandler<ICreatePatient> = async (data) => {
    setErrors([]);
    console.log(data);
    return;
    const result = await patientService.create(data);
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
            <Input md={9} label="Nome:" {...register("name")}></Input>

            <Input md={3} label="CPF:" {...register("cpf")}></Input>
            <Input md={2} label="RG:" {...register("rg")}></Input>

            <Input md={4} label="Cargo:" {...register("role")} asChild>
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
            <Input md={3} label="Doc. N°:" {...register("doc.n°")}></Input>
            <Input md={3} label="CNS:" {...register("cns")}></Input>

            <Input md={2} label="CEP:" {...register("address.cep")}></Input>
            <Input
              md={7}
              label="Endereço:"
              {...register("address.street")}
            ></Input>
            <Input
              md={1}
              label="N°:"
              {...register("address.streetNumber")}
            ></Input>

            <Input
              md={3}
              label="Estado:"
              {...register("address.stateId")}
            ></Input>
            <Input
              md={4}
              label="Município:"
              {...register("address.district")}
            ></Input>
            <Input md={5} label="Bairro:"></Input>
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
