import axios from 'axios';

import {ICreatePatient} from '../../../backend/src/shared/interfaces/create-patient.interface'


class PatientService {
  async create(patientData:ICreatePatient) {
    const response = await axios({
      method: 'post',
      url: 'http://localhost:3000/patients',
      data: patientData,
    });
    return response.data;
  }}

export default PatientService;