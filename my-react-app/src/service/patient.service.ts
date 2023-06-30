import axios, { } from 'axios';
import { SearchPatientQueryDto } from '../types/backend.dtos';
import { ICreatePatientDTO } from '../types/backend.interfaces';
import api from './api';
import { objectFieldsToString } from '../utils/object';

const patientService = {
  async create(patientData:ICreatePatientDTO) {
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
  },

  async searchPatients(query: SearchPatientQueryDto) {
    const o = { ...query };

    const objString = `?${(new URLSearchParams(objectFieldsToString(o))).toString()}`;

    const response = await api.get(`/patients${objString}`);

    return response.data;
  },

  async getAll() {
    try {
      const response = await axios({
        method: 'get',
        url: 'http://localhost:3000/patients',

      });
      return response.data;
    } catch (error: any) {
      return error.response?.data;
    }
  },
  async getByCPF(cpf: string) {
    try {
      const response = await axios({
        method: 'get',
        url: `http://localhost:3000/patients/cpf/${cpf}`,
      });
      return response.data;
    } catch (error: any) {
      return error.response?.data;
    }
  },
  async getOne(patientId: string) {
    try {
      const response = await axios({
        method: 'get',
        url: `http://localhost:3000/patients/${patientId}`,
      });
      return response.data;
    } catch (error: any) {
      return error.response?.data;
    }
  },
  async update(patientId: string, patientData:any) {
    try {
      const response = await axios({
        method: 'put',
        url: `http://localhost:3000/patients/${patientId}`,
        data: patientData,
      });
      return response.data;
    } catch (error: any) {
      return error.response?.data;
    }
  },

};

export default patientService;
