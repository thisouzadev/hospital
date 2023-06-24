import { SubmitHandler } from 'react-hook-form';

import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import PatientForm from './PatientForm';
import patientService from '../../service/patient.service';
import { Patient } from '../../types/backend.models';

const createSchema = {
  name: yup.string().required(),
  birth: yup.date().required(),
  cpf: yup.string().length(11).required(),
  gender: yup.string().required(),
  race: yup.string().required(),
  maritalState: yup.string().required(),
  phone: yup.string().required(),
  address: yup.object().shape({
    street: yup.string().required(),
    stateId: yup.number().required(),
    cityId: yup.number().required(),
    district: yup.string().required(),
    cep: yup.string().length(8).required(),
  }),
};

function CreatePatient() {
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Patient> = async (data) => {
    const result = await patientService.create(data);
    if (result.error) {
      return;
    }
    navigate('/admin/pacientes');
  };

  return (
    <div className="w-full">
      <div className="max-w-5xl m-auto pt-20">
        <PatientForm handleFormSubmit={onSubmit} schema={createSchema} />
      </div>
    </div>
  );
}

export default CreatePatient;
