import { PropsWithChildren, useEffect, useState } from 'react';

import doctorsService from '../../service/doctors.service';
import { Doctor } from '../../types/backend.models';
import Button from '../../components/Button';
import Input from '../../components/Input';
import SearchImg from '../../assets/search.svg';
import DoctorImg from '../../assets/doctor.svg';
import EditImg from '../../assets/edit.svg';
import DeleteImg from '../../assets/delete.svg';

const Field = ({ children }:PropsWithChildren) => (
  <div className="rounded-lg bg-[#f0f0f0] w-full text-center p-1 ring-1 ring-blue-300 h-10 text-xl">{children}</div>
);

interface IDoctorFilter {name: string, cns: string, cpf: string}

const filterDoctors = (doctors: Doctor[], filter: IDoctorFilter):Doctor[] => doctors.filter(
  (doctor) => doctor.employee.name.startsWith(
    filter.name,
  )
    && doctor.employee.cpf.startsWith(filter.cpf)
    && (!doctor.employee.cns || doctor.employee.cns.startsWith(filter.cns)),
);

const CreateDoctorSchedules = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const [doctorFilter, setDoctorFilters] = useState<IDoctorFilter>({ name: '', cns: '', cpf: '' });

  const [selectedDoctor, setSelectedDoctor] = useState<Doctor>();

  const handleChangeFilter = (item: keyof IDoctorFilter, e:any) => {
    const { value } = e.target;
    const newFilter = { ...doctorFilter, [item]: value };
    setDoctorFilters(newFilter);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await doctorsService.getAll();
      setDoctors(response);
    };
    fetchData();
  }, []);

  return (
    <div className="bg-[#D9D9D980] rounded-xl w-full">
      <Field>
        Criação de Agenda Médica
      </Field>
      <div className=" mt-2 bg-[#D9D9D980] rounded-xl">
        <div className="p-2 flex gap-3 items-center">
          <Input
            textCenter
            className="ring-blue-300 bg-[#D9D9D980] text-xl a"
            placeholder="Nome do Médico"
            md={5}
            value={doctorFilter.name}
            onChange={(e) => handleChangeFilter('name', e)}
          />
          <Input
            textCenter
            className="ring-blue-300 bg-[#D9D9D980] text-xl a"
            placeholder="CNS"
            md={5}
            onChange={(e) => handleChangeFilter('cns', e)}

          />
          <Input
            textCenter
            className="ring-blue-300 bg-[#D9D9D980] text-xl a"
            placeholder="CPF"
            md={5}
            onChange={(e) => handleChangeFilter('cpf', e)}

          />
          <img src={SearchImg} alt="" className="pt-1" />
        </div>
        <div>
          <table className="w-full text-sm text-center border-separate border-spacing-y-2 border-spacing-x-2">
            <tbody className="border">
              {filterDoctors(doctors, doctorFilter).map((doctor) => (
                <tr key={doctor.doctorId} className="h-10  rounded-lg ring-2 ring-blue-300 ">
                  <td className="w-3/6 ">
                    <Field>
                      {doctor.employee.name}
                    </Field>
                  </td>
                  <td className="w-1/5">
                    <Field>
                      {doctor.employee.cns}
                    </Field>
                  </td>
                  <td className="w-1/4">
                    <Field>
                      {doctor.employee.cpf}
                    </Field>
                  </td>
                  <td className="px-2 rounded-lg">
                    <button type="button" onClick={() => { setSelectedDoctor(doctor); }}>
                      <img src={DoctorImg} alt="" className="pt-1" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      <div className="grid grid-cols-12 gap-2 mt-2 p-2 bg-[#D9D9D980] rounded-lg">
        <Input
          textCenter
          className="ring-blue-300 bg-[#D9D9D980] text-xl a"
          placeholder="Nome do Médico"
          md={8}
          value={selectedDoctor?.employee.name}
        />
        <Input
          textCenter
          className="ring-blue-300 bg-[#D9D9D980] text-xl a"
          placeholder="Especialidade"
          md={4}
          value={selectedDoctor?.specialty}
        />

        <Input
          textCenter
          className="ring-blue-300 bg-[#D9D9D980] text-xl a"
          placeholder="Nome da unidade"
          md={5}
          value={selectedDoctor?.employee.hospital.name}

        />
        <Input
          textCenter
          className="ring-blue-300 bg-[#D9D9D980] text-xl a"
          placeholder="Dia da Semana"
          md={3}
        />
        <Input
          textCenter
          className="ring-blue-300 bg-[#D9D9D980] text-xl a"
          placeholder="Horário"
          md={2}
        />
        <Input
          textCenter
          className="ring-blue-300 bg-[#D9D9D980] text-xl a"
          placeholder="Quan. vagas"
          md={2}
        />

        <div className="flex justify-center gap-10 py-8 w-full col-span-12">
          <Button variant="small">Editar</Button>
          <Button variant="small">Incluir</Button>
          <Button variant="small">Busca</Button>
        </div>
      </div>

      <div className="mt-3">
        <Field>Agendas Disponíveis</Field>
        <table className="w-full text-sm text-center border-separate border-spacing-y-2 border-spacing-x-2">
          <tbody className="border">
            {doctors.map((doctor) => (
              <tr key={doctor.doctorId} className="h-10  rounded-lg ring-2 ring-blue-300 ">
                <td className="w-3/6 ">
                  <Field>
                    {doctor.employee.name}
                  </Field>
                </td>
                <td className="w-1/5">
                  <Field>
                    Segunda
                  </Field>
                </td>
                <td className="w-1/5">
                  <Field>
                    10 vagas
                  </Field>
                </td>
                <td className="px-2 rounded-lg">
                  <img src={EditImg} alt="" className="pt-1" />
                </td>
                <td className="px-2 rounded-lg">
                  <img src={DeleteImg} alt="" className="pt-1" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreateDoctorSchedules;
