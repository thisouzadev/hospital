import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { PanelSubHeader } from '../Panel';
import Input from '../Input';
import Field from '../Field';
import { UpdateTechnicianAttendanceDto } from '@/types/backend.dtos';

interface Props {
  register: UseFormRegister<UpdateTechnicianAttendanceDto>
  errors: FieldErrors<UpdateTechnicianAttendanceDto>
}

const AttendanceWeightPA = ({ register, errors }:Props) => (
  <PanelSubHeader className="flex justify-center gap-1 p-4 bg-[#d9d9d962]">
    <Field className="px-4 py-1" variant="minimal">PA:</Field>
    <Input md={2} className="w-20" {...register('systolicBP', { valueAsNumber: true })} type="number" error={errors.systolicBP} />
    <Field className="px-4 py-1" variant="minimal">X</Field>
    <Input md={2} className="w-20" {...register('diastolicBP', { valueAsNumber: true })} type="number" error={errors.diastolicBP} />
    <Field className="px-4 py-1" variant="minimal">mmHg</Field>
    <Field className="px-4 py-1" variant="minimal">Peso:</Field>
    <Input md={2} className="w-20" {...register('weight', { valueAsNumber: true })} type="number" error={errors.weight} />
    <Field className="px-4 py-1" variant="minimal">Kg</Field>
  </PanelSubHeader>
);

export default AttendanceWeightPA;
