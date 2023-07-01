import { PropsWithChildren } from 'react';
import clsx from 'clsx';
import { weekDays } from '../../../types/date';
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
  selectedSchedule?: IAvailableSchedules
  onSelectSchedule: (s: IAvailableSchedules) => void
  emptyMessage?: string
}

const Field = ({ children, className }:PropsWithChildren<{ className?: string }>) => (
  <div className={
    clsx('rounded-lg bg-[#f0f0f0] w-full text-center p-1 ring-1 ring-blue-300 h-10 text-xl', className)
  }
  >
    {children}

  </div>
);

const AvailableSchedules = ({
  availableSchedules, onSelectSchedule, emptyMessage, selectedSchedule,
}:Props) => (
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
          {availableSchedules?.map((schedule) => (
            <tr
              key={schedule.isoDate}
              className={clsx(
                'h-10  rounded-lg ring-2 ring-blue-300 ',
                { 'ring-orange-700': selectedSchedule?.isoDate === schedule.isoDate },
              )}
            >
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
              <td className="w-2/12 ">
                <Field className={clsx(
                  { 'bg-red-300': schedule.vacancies === 0 },
                  { 'bg-orange-300': schedule.vacancies === 1 },
                  { 'bg-green-300': schedule.vacancies > 1 },
                )}
                >
                  {schedule.vacancies}
                </Field>
              </td>
              <td className="w-1/5 ">
                <button type="button" onClick={() => onSelectSchedule(schedule)} title="Marcar Paciente">
                  <img src={confirmationImg} alt="" className="mt-1" />
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
      {availableSchedules.length === 0
        && (

        <span className="font-bold">{emptyMessage}</span>

        )}
    </div>
  </div>
);

export default AvailableSchedules;
