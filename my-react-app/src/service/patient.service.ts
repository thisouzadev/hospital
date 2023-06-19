import axios, { AxiosError } from 'axios';

import {ICreatePatient} from '../../../backend/src/shared/interfaces/create-patient.interface'


const patientService = {
  async create(patientData:ICreatePatient) {
    try {
      const response = await axios({
        method: 'post',
        url: 'http://localhost:3000/patients',
        data: patientData,
      });
      return response.data;
      
    } catch (error: any) {
      return error.response?.data;
    }
  }}

export default patientService;