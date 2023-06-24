import { SubmitHandler } from 'react-hook-form';

import { Patient } from 'types/backend.models';

import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PatientForm from './PatientForm';
import patientService from '../../service/patient.service';
import Loading from '../../components/loading';

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

function UpdatePatient() {
  const { patientId } = useParams();

  const navigate = useNavigate();

  const [patient, setPatient] = useState<Patient>();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPatient = async () => {
      if (!patientId) {
        return;
      }
      const patientData = await patientService.getOne(patientId);
      setPatient(patientData);
      setIsLoading(false);
    };

    if (patientId) {
      fetchPatient();
    }
  }, [patientId]);

  const onSubmit: SubmitHandler<Patient> = async (data) => {
    if (!patient) {
      return;
    }

    const {
      name,
      birth,
      cns,
      cpf,
      father,
      maritalState,
      gender,
      mother,
      occupation,
      phone,
      placeOfBirth,
      race,
      responsible,
      rg,
    } = data;

    const {
      addressId, cep, cityId, district, stateId, street, streetNumber,
    } = data.address;

    const result = await patientService.update(patient.patientId, {
      name,
      birth,
      cns,
      cpf,
      father,
      maritalState,
      gender,
      mother,
      occupation,
      phone,
      placeOfBirth,
      race,
      responsible,
      rg,
      address: {
        addressId, cep, cityId, district, stateId, street, streetNumber,
      },
    });
    if (result.error) {
      console.log(result.message);
      return;
    }
    navigate('/admin/pacientes');
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full">
      <div className="max-w-5xl m-auto pt-20">
        <PatientForm
          patient={patient}
          handleFormSubmit={onSubmit}
          schema={createSchema}
          isUpdating
        />
      </div>
    </div>
  );
}

export default UpdatePatient;
