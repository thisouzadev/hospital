import axios, {  } from 'axios';
import { ICreatePatientDTO } from '../types/backend.interfaces';



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
      console.log(error)
      return error.response?.data;
    }
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
        url: 'http://localhost:3000/patients/cpf/' +  cpf,
      });
      return response.data;
      
    } catch (error: any) {
      return error.response?.data;
    }
  }
}

export default patientService;