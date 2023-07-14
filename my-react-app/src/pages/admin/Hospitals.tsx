import { PropsWithChildren, useEffect, useState } from "react";
import { State, City } from "../../types/backend.models";

import { useForm, Controller, useFormState } from "react-hook-form";
import { CreateHospitalDto } from "types/backend.dtos";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { Hospital } from "../../types/backend.models";
import Button from "../../components/Button";
import Input from "../../components/Input";

import EditImg from "../../assets/edit.svg";
import DeleteImg from "../../assets/delete.svg";
import Loading from "../../components/loading";
import hospitalService from "@/service/hospital.service";
import ManageImg from "../../assets/manage.svg";
import citiesService from "@/service/cities.service";

const hospitalSchema = {
  hospitalName: yup
    .string()
    .min(3, "O nome da unidade precisa ter ao menos 3 caracteres")
    .required(),
  director: yup.string().required(),
  address: yup.object().shape({
    cep: yup
      .string()
      .matches(/^\d{5}-\d{3}$/, "O CEP deve estar no formato 12345-678")
      .required("O CEP é obrigatório"),
    cityId: yup.number().required("O município é obrigatório"),
    stateId: yup.number().required("O Estado é obrigatório"),
    district: yup.string().required("O bairro é obrigatório"),
    street: yup.string().required("A rua é obrigatória"),
    streetNumber: yup.string().optional(),
  }),
};

const Field = ({ children }: PropsWithChildren) => (
  <div className="rounded-lg bg-[#f0f0f0] w-full text-center p-1 ring-1 ring-blue-300 h-10 text-xl">
    {children}
  </div>
);

const defaultHospitalData: CreateHospitalDto = {
  hospitalName: "",
  director: "",
  address: {
    cep: "",
    cityId: "",
    stateId: "",
    district: "",
    street: "",
    streetNumber: "",
  },
};

const Hospitals = () => {
  const queryClient = useQueryClient();
  const { clearErrors, setValue } = useForm();

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
    };

    fetchStates();
  }, []);
  const onChangeSelectedState = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const stateId = parseInt(e.target.value);
    // Atualizar o valor do estado selecionado no formulário
    setValue("address.stateId", stateId);
    setValue("address.cityId", ""); // Limpar o valor do campo de cidade
    clearErrors("address.stateId"); // Limpar os erros relacionados ao campo de estado

    if (stateId) {
      loadCities(stateId);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateHospitalDto>({
    defaultValues: defaultHospitalData,
    resolver: yupResolver(yup.object().shape(hospitalSchema).required()),
  });

  const [selectedSectorId, setSelectedSectorId] = useState("");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["hospitals"],
    queryFn: () => hospitalService.getAll(),
    retry: false,
  });

  const responseError = error as any;

  const createSectorMutation = useMutation(hospitalService.create, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries("hospitals");
      reset(defaultHospitalData);
    },
  });

  const deleteSectorMutation = useMutation(hospitalService.delete, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries("hospitals");
      reset({});
    },
  });

  const updateSectorMutation = useMutation(hospitalService.update, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries("hospitals");
      reset(defaultHospitalData);
    },
  });

  const sectors = data?.result || [];

  const handleDeleteSector = async (hospital: Hospital) => {
    // eslint-disable-next-line no-alert
    if (!window.confirm("Deseja excluir a unidade?")) {
      return;
    }
    deleteSectorMutation.mutate(hospital.hospitalId);
  };

  const handleAddSchedule = async (hospitalData: CreateHospitalDto) => {
    createSectorMutation.mutate(hospitalData);
  };

  const handleUpdateSchedule = async (hospitalData: CreateHospitalDto) => {
    updateSectorMutation.mutate({
      sectorId: selectedSectorId,
      data: hospitalData,
    });
  };

  const handleSelectSector = (hospital: Hospital) => {
    const { hospitalName, director } = hospital;

    setSelectedSectorId(hospital.hospitalId);

    reset({
      hospitalName,
      director,
    });
  };

  const handleResetSector = () => {
    setSelectedSectorId("");
    reset(defaultHospitalData);
  };

  if (isError) {
    return <div>{responseError.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-[#D9D9D980] rounded-xl w-full">
      <Field>Unidades de Saúde</Field>
      <div className=" mt-2 bg-[#D9D9D980] rounded-xl">
        <div />
      </div>

      <div className="grid grid-cols-12 gap-2 mt-2 p-2 bg-[#D9D9D980] rounded-lg">
        <Input
          textCenter
          className="ring-blue-300 bg-[#D9D9D980] text-xl"
          placeholder="Nome do Setor"
          md={3}
          {...register("hospitalName")}
          error={errors.hospitalName}
        />
        <Input
          textCenter
          className="ring-blue-300 bg-[#D9D9D980] text-xl"
          placeholder="Descrição do setor (Max: 50 caracteres)"
          md={9}
          {...register("director")}
          error={errors.director}
        />

        <Input
          textCenter
          className="ring-blue-300 bg-[#D9D9D980] text-xl"
          placeholder="CEP:"
          md={3}
          {...register("address.cep")}
          error={errors.address?.cep}
        />
        <Input
          textCenter
          className="ring-blue-300 bg-[#D9D9D980] text-xl"
          placeholder="Endereço:"
          md={3}
          {...register("address.street")}
          error={errors.address?.street}
        />
        <Input
          textCenter
          className="ring-blue-300 bg-[#D9D9D980] text-xl"
          placeholder="N°:"
          md={3}
          {...register("address.streetNumber")}
          error={errors.address?.streetNumber}
        />

        <Input
          md={3}
          textCenter
          className="ring-blue-300 bg-[#D9D9D980] text-xl"
          label="Estado:"
          asChild
          onChange={onChangeSelectedState}
          error={errors.address?.stateId}
          isLoading={isLoadingStates}
        >
          <select {...register("address.stateId", { valueAsNumber: true })}>
            <option hidden value="">
              {" "}
            </option>
            {states.map((state) => (
              <option key={state.stateId} value={state.stateId}>
                {state.abbreviation}
              </option>
            ))}
          </select>
        </Input>
        <Input
          md={4}
          textCenter
          className="ring-blue-300 bg-[#D9D9D980] text-xl"
          label="Município:"
          asChild
          error={errors.address?.cityId}
          isLoading={isLoadingCities}
        >
          <select {...register("address.cityId", { valueAsNumber: true })}>
            <option hidden value="">
              {" "}
            </option>
            {cities.map((city) => (
              <option key={city.cityId} value={city.cityId}>
                {city.name}
              </option>
            ))}
          </select>
        </Input>

        <div className="flex justify-center gap-10 py-8 w-full col-span-12">
          <Button
            variant="small"
            onClick={handleSubmit(handleUpdateSchedule)}
            disabled={!selectedSectorId}
          >
            Editar
          </Button>
          <Button variant="small" onClick={handleSubmit(handleAddSchedule)}>
            Incluir
          </Button>
          <Button variant="small" onClick={() => handleResetSector()}>
            Limpar
          </Button>
        </div>
      </div>

      <div className="mt-3">
        <Field>Unidades</Field>
        {isLoading ? (
          <Loading />
        ) : (
          <table className="w-full text-sm text-center border-separate border-spacing-y-2 border-spacing-x-2">
            <tbody className="border">
              {sectors.length === 0 && (
                <div className="text-lg">Nenhuma unidade cadastrada</div>
              )}
              {sectors.map((hospital) => (
                <tr
                  key={hospital.hospitalId}
                  className="h-10  rounded-lg ring-2 ring-blue-300 "
                >
                  <td className="w-3/12">
                    <Field>{hospital?.hospitalName}</Field>
                  </td>

                  <td className="w-7/12">
                    <Field>{hospital?.director}</Field>
                  </td>

                  <td className="px-2 rounded-lg">
                    <Link
                      to={`/super-admin/hospitais/funcionario/${hospital.hospitalId}`}
                    >
                      <img
                        src={ManageImg}
                        alt=""
                        className="pt-1 w-10"
                        title="Cadastrar funcionário"
                      />
                    </Link>
                  </td>

                  <td className="px-2 rounded-lg">
                    <button
                      type="button"
                      onClick={() => handleSelectSector(hospital)}
                      title="Atualizar os dados"
                    >
                      <img src={EditImg} alt="" className="pt-1" />
                    </button>
                  </td>
                  <td className="px-2 rounded-lg">
                    <button
                      type="button"
                      onClick={() => handleDeleteSector(hospital)}
                      title="Remover setor"
                    >
                      <img src={DeleteImg} alt="" className="pt-1" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Hospitals;
