import { PropsWithChildren, useState } from 'react';

import { useForm } from 'react-hook-form';
import { CreateHospitalDto } from 'types/backend.dtos';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { Hospital } from '../../types/backend.models';
import Button from '../../components/Button';
import Input from '../../components/Input';

import EditImg from '../../assets/edit.svg';
import DeleteImg from '../../assets/delete.svg';
import Loading from '../../components/loading';
import hospitalService from '@/service/hospital.service';
import ManageImg from '../../assets/manage.svg';

const hospitalSchema = {
  hospitalName: yup.string().min(3, 'O nome da unidade precisa ter ao menos 3 caracteres').required(),
  director: yup.string().required(),
};

const Field = ({ children }:PropsWithChildren) => (
  <div className="rounded-lg bg-[#f0f0f0] w-full text-center p-1 ring-1 ring-blue-300 h-10 text-xl">{children}</div>
);

const defaultHospitalData:CreateHospitalDto = {
  hospitalName: '',
  director: '',
};

const Hospitals = () => {
  const queryClient = useQueryClient();

  const {
    register, handleSubmit, reset, formState: { errors },
  } = useForm<CreateHospitalDto>({
    defaultValues: defaultHospitalData,
    resolver: yupResolver(yup.object().shape(hospitalSchema).required()),

  });

  const [selectedSectorId, setSelectedSectorId] = useState('');

  const {
    data, isLoading, isError, error,
  } = useQuery({ queryKey: ['hospitals'], queryFn: () => hospitalService.getAll(), retry: false });

  const responseError = error as any;

  const createSectorMutation = useMutation(hospitalService.create, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('hospitals');
      reset(defaultHospitalData);
    },
  });

  const deleteSectorMutation = useMutation(hospitalService.delete, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('hospitals');
      reset({});
    },
  });

  const updateSectorMutation = useMutation(hospitalService.update, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('hospitals');
      reset(defaultHospitalData);
    },
  });

  const sectors = data?.result || [];

  const handleDeleteSector = async (hospital: Hospital) => {
    // eslint-disable-next-line no-alert
    if (!window.confirm('Deseja excluir a unidade?')) {
      return;
    }
    deleteSectorMutation.mutate(hospital.hospitalId);
  };

  const handleAddSchedule = async (hospitalData: CreateHospitalDto) => {
    createSectorMutation.mutate(hospitalData);
  };

  const handleUpdateSchedule = async (hospitalData: CreateHospitalDto) => {
    updateSectorMutation.mutate({ sectorId: selectedSectorId, data: hospitalData });
  };

  const handleSelectSector = (hospital: Hospital) => {
    const {
      hospitalName,
      director,
    } = hospital;

    setSelectedSectorId(hospital.hospitalId);

    reset({
      hospitalName,
      director,
    });
  };

  const handleResetSector = () => {
    setSelectedSectorId('');
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
      <Field>
        Unidades de Saúde
      </Field>
      <div className=" mt-2 bg-[#D9D9D980] rounded-xl">
        <div />

      </div>

      <div className="grid grid-cols-12 gap-2 mt-2 p-2 bg-[#D9D9D980] rounded-lg">
        <Input
          textCenter
          className="ring-blue-300 bg-[#D9D9D980] text-xl"
          placeholder="Nome do Setor"
          md={3}
          {...register('hospitalName')}
          error={errors.hospitalName}
        />
        <Input
          textCenter
          className="ring-blue-300 bg-[#D9D9D980] text-xl"
          placeholder="Descrição do setor (Max: 50 caracteres)"
          md={9}
          {...register('director')}
          error={errors.director}
        />

        <div className="flex justify-center gap-10 py-8 w-full col-span-12">
          <Button variant="small" onClick={handleSubmit(handleUpdateSchedule)} disabled={!selectedSectorId}>Editar</Button>
          <Button variant="small" onClick={handleSubmit(handleAddSchedule)}>Incluir</Button>
          <Button variant="small" onClick={() => handleResetSector()}>Limpar</Button>
        </div>
      </div>

      <div className="mt-3">
        <Field>Unidades</Field>
        {isLoading ? <Loading />
          : (
            <table className="w-full text-sm text-center border-separate border-spacing-y-2 border-spacing-x-2">
              <tbody className="border">
                {sectors.length === 0
              && <div className="text-lg">Nenhuma unidade cadastrada</div>}
                {sectors.map((hospital) => (
                  <tr key={hospital.hospitalId} className="h-10  rounded-lg ring-2 ring-blue-300 ">
                    <td className="w-3/12">
                      <Field>
                        {hospital?.hospitalName}
                      </Field>
                    </td>

                    <td className="w-7/12">
                      <Field>
                        {hospital?.director}
                      </Field>
                    </td>

                    <td className="px-2 rounded-lg">
                      <Link to={`/super-admin/hospitais/funcionario/${hospital.hospitalId}`}>
                        <img src={ManageImg} alt="" className="pt-1 w-10" title="Cadastrar funcionário" />
                      </Link>
                    </td>

                    <td className="px-2 rounded-lg">
                      <button type="button" onClick={() => handleSelectSector(hospital)} title="Atualizar os dados">
                        <img src={EditImg} alt="" className="pt-1" />
                      </button>
                    </td>
                    <td className="px-2 rounded-lg">
                      <button type="button" onClick={() => handleDeleteSector(hospital)} title="Remover setor">
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
