import { PropsWithChildren } from 'react';
import weekDays from '../../../types/date';
import confirmationImg from '../../../assets/confirmation.svg';

export interface IAvailableSchedules {
  scheduleId: string;
  doctorName: string;
  specialty: string;
  date: Date;
  isoDate: string;
  weekDay: number;
  vacancies: number;
  available?: number;
}

interface Props {
  availableSchedules: IAvailableSchedules[]
  onSelectSchedule: (s: IAvailableSchedules) => void
}

const Field = ({ children }:PropsWithChildren) => (
  <div className="rounded-lg bg-[#f0f0f0] w-full text-center p-1 ring-1 ring-blue-300 h-10 text-xl">{children}</div>
);

const AvailableSchedules = ({ availableSchedules, onSelectSchedule }:Props) => (
  <div className="flex justify-evenly">
    <div className="text-lg w-full">
      <span className="text-xl">
        Vagas
      </span>
      <table className="w-full text-center border-separate border-spacing-y-2 border-spacing-x-2">
        <thead className="font-bold">
          <tr>
            <td className="w-1/5 ">
              <Field>
                dia
              </Field>
            </td>
            <td className="w-1/5 ">
              <Field>
                Nome
              </Field>
            </td>
            <td className="w-1/5 ">
              <Field>
                Especialidade
              </Field>
            </td>
            <td className="w-1/5">
              <Field>
                dia da semana
              </Field>
            </td>
            <td className="w-1/12">
              <Field>
                Vagas
              </Field>
            </td>
            <td className="w-1/5">
              <button type="button" className="invisible">
                <img src={confirmationImg} alt="" className="mt-1" />
              </button>
            </td>
          </tr>
        </thead>
        <tbody className="border">
          {availableSchedules.length === 0
                && (
                <tr>
                  <td>
                    <span>Selecione mês e médico</span>
                  </td>
                </tr>
                )}
          {availableSchedules?.map((schedule) => (
            <tr key={schedule.isoDate} className="h-10  rounded-lg ring-2 ring-blue-300 ">
              <td className="w-1/5 ">
                <Field>
                  {schedule.date.getDate()}
                </Field>
              </td>
              <td className="w-1/5 ">
                <Field>
                  {schedule.doctorName}
                </Field>
              </td>
              <td className="w-1/5 ">
                <Field>
                  {schedule.specialty}
                </Field>
              </td>
              <td className="w-1/5">
                <Field>
                  {weekDays[schedule.weekDay]}
                </Field>
              </td>
              <td className="w-2/12">
                <Field>
                  {schedule.vacancies}
                </Field>
              </td>
              <td className="w-1/5">
                <button type="button" onClick={() => onSelectSchedule(schedule)}>
                  <img src={confirmationImg} alt="" className="mt-1" />
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>

    </div>
  </div>
);

export default AvailableSchedules;
