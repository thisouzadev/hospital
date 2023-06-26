import { PropsWithChildren } from 'react';

import Button from '../../components/Button';
import Input from '../../components/Input';
import SearchImg from '../../assets/search.svg';
import DoctorImg from '../../assets/doctor.svg';
import EditImg from '../../assets/edit.svg';
import DeleteImg from '../../assets/delete.svg';

const Field = ({ children }:PropsWithChildren) => (
  <div className="rounded-lg bg-[#f0f0f0] w-full text-center p-1 ring-1 ring-blue-300 h-10 text-xl">{children}</div>
);

const CreateDoctorSchedules = () => {
  const doctors = [
    {
      name: 'Joao', doc: '123', cns: '123', cpf: '123456',
    },
    {
      name: 'Joao2', doc: '1234', cns: '1234', cpf: '123456',
    },
    {
      name: 'Joao3', doc: '12134', cns: '121234', cpf: '123456',
    },
  ];

  return (
    <div className="bg-[#D9D9D980] rounded-xl w-full">
      <Field>
        Criação de Agenda Médica
      </Field>
      <div className=" mt-2 bg-[#D9D9D980] rounded-xl">
        <div className="p-2 flex gap-3 items-center">
          <Field>Nome do Médico   </Field>
          <Field>CNS</Field>
          <Field>CPF</Field>
          <img src={SearchImg} alt="" className="pt-1" />
        </div>
        <div>
          <table className="w-full text-sm text-center border-separate border-spacing-y-2 border-spacing-x-2">
            <tbody className="border">
              {doctors.map((doctor) => (
                <tr key={doctor.cpf} className="h-10  rounded-lg ring-2 ring-blue-300 ">
                  <td className="w-3/6 ">
                    <Field>
                      {doctor.name}
                    </Field>
                  </td>
                  <td className="w-1/5">
                    <Field>
                      {doctor.doc}
                    </Field>
                  </td>
                  <td className="w-1/4">
                    <Field>
                      {doctor.cns}
                    </Field>
                  </td>
                  <td className="px-2 rounded-lg">
                    <img src={DoctorImg} alt="" className="pt-1" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      <div className="grid grid-cols-12 gap-2 mt-2 p-2 bg-[#D9D9D980] rounded-lg">
        <Input textCenter placeholder="Nome do Médico" md={8} className="ring-blue-300 bg-[#D9D9D980] text-xl a" />
        <Input textCenter placeholder="Especialidade" md={4} className="ring-blue-300 bg-[#D9D9D980] text-xl" />

        <Input textCenter placeholder="Nome da unidade" md={5} className="ring-blue-300 bg-[#D9D9D980] text-xl" />
        <Input textCenter placeholder="Dia da Semana" md={3} className="ring-blue-300 bg-[#D9D9D980] text-xl" />
        <Input textCenter placeholder="Horário" md={2} className="ring-blue-300 bg-[#D9D9D980] text-xl" />
        <Input textCenter placeholder="Quan. vagas" md={2} className="ring-blue-300 bg-[#D9D9D980] text-xl" />

        <div className="flex justify-center gap-10 py-8 w-full col-span-12">
          <Button>Editar</Button>
          <Button>Incluir</Button>
          <Button>Busca</Button>
        </div>
      </div>

      <div>
        <Field>Agendas Disponíveis</Field>
        <table className="w-full text-sm text-center border-separate border-spacing-y-2 border-spacing-x-2">
          <tbody className="border">
            {doctors.map((doctor) => (
              <tr key={doctor.cpf} className="h-10  rounded-lg ring-2 ring-blue-300 ">
                <td className="w-3/6 ">
                  <Field>
                    {doctor.name}
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
