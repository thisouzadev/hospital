import { PropsWithChildren, useState } from 'react';

import { useForm } from 'react-hook-form';
import { CreateSectorDto } from 'types/backend.dtos';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Button from '../../components/Button';
import Input from '../../components/Input';

import EditImg from '../../assets/edit.svg';
import DeleteImg from '../../assets/delete.svg';
import sectorService from '@/service/sector.service';
import Loading from '../../components/loading';
import { ISector } from '@/types/backend.interfaces';

const scheduleSchema = {
  name: yup.string().min(3, 'O nome do setor precisa ter ao menos 3 caracteres').required(),
  description: yup.string().max(50, 'A descrição não pode ter mais de 50 caracteres').required(),
};

const Field = ({ children }:PropsWithChildren) => (
  <div className="rounded-lg bg-[#f0f0f0] w-full text-center p-1 ring-1 ring-blue-300 h-10 text-xl">{children}</div>
);

const defaultSectorData:CreateSectorDto = {
  name: '',
  description: '',
};

const HospitalSectors = () => {
  const queryClient = useQueryClient();

  const {
    register, handleSubmit, reset, formState: { errors },
  } = useForm<CreateSectorDto>({
    defaultValues: defaultSectorData,
    resolver: yupResolver(yup.object().shape(scheduleSchema).required()),

  });

  const [selectedSectorId, setSelectedSectorId] = useState('');

  const { data, isLoading } = useQuery({ queryKey: ['sectors'], queryFn: () => sectorService.getAll() });

  const createSectorMutation = useMutation(sectorService.create, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('sectors');
      reset(defaultSectorData);
    },
  });

  const deleteSectorMutation = useMutation(sectorService.delete, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('sectors');
      reset({});
    },
  });

  const updateSectorMutation = useMutation(sectorService.update, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('sectors');
      reset(defaultSectorData);
    },
  });

  const sectors = data?.result || [];

  const handleDeleteSector = async (sector: ISector) => {
    // eslint-disable-next-line no-alert
    if (!window.confirm('Deseja excluir o setor?')) {
      return;
    }
    deleteSectorMutation.mutate(sector.sectorId);
  };

  const handleAddSchedule = async (sector: CreateSectorDto) => {
    createSectorMutation.mutate(sector);
  };

  const handleUpdateSchedule = async (sector: CreateSectorDto) => {
    updateSectorMutation.mutate({ sectorId: selectedSectorId, data: sector });
  };

  const handleSelectSector = (sector: ISector) => {
    const {
      name, description,
    } = sector;

    setSelectedSectorId(sector.sectorId);

    reset({
      name,
      description,
    });
  };

  const handleResetSector = () => {
    setSelectedSectorId('');
    reset(defaultSectorData);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-[#D9D9D980] rounded-xl w-full">
      <Field>
        Setores da Unidade de Saúde
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
          {...register('name')}
          error={errors.name}
        />
        <Input
          textCenter
          className="ring-blue-300 bg-[#D9D9D980] text-xl"
          placeholder="Descrição do setor (Max: 50 caracteres)"
          md={9}
          {...register('description')}
          error={errors.description}
        />

        <div className="flex justify-center gap-10 py-8 w-full col-span-12">
          <Button variant="small" onClick={handleSubmit(handleUpdateSchedule)} disabled={!selectedSectorId}>Editar</Button>
          <Button variant="small" onClick={handleSubmit(handleAddSchedule)}>Incluir</Button>
          <Button variant="small" onClick={() => handleResetSector()}>Limpar</Button>
        </div>
      </div>

      <div className="mt-3">
        <Field>Setores</Field>
        {sectors.length === 0
              && <div className="text-lg w-full text-center">Nenhum setor cadastrada</div>}
        <table className="w-full text-sm text-center border-separate border-spacing-y-2 border-spacing-x-2">
          <tbody className="border">
            {sectors.map((sector) => (
              <tr key={sector.sectorId} className="h-10  rounded-lg ring-2 ring-blue-300 ">
                <td className="w-3/12">
                  <Field>
                    {sector?.name}
                  </Field>
                </td>

                <td className="w-8/12">
                  <Field>
                    {sector?.description}
                  </Field>
                </td>

                <td className="px-2 rounded-lg">
                  <button type="button" onClick={() => handleSelectSector(sector)} title="Atualizar os dados">
                    <img src={EditImg} alt="" className="pt-1" />
                  </button>
                </td>
                <td className="px-2 rounded-lg">
                  <button type="button" onClick={() => handleDeleteSector(sector)} title="Remover setor">
                    <img src={DeleteImg} alt="" className="pt-1" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HospitalSectors;
