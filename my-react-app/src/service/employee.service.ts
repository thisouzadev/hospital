import axios from 'axios';
import { ICreateEmployeeDTO } from '../types/backend.interfaces';

class EmployeeService {
  async getAllEmployee() {
    const response = await axios({
      method: 'get',
      url: 'http://localhost:3000/employees',
      data: {},
    });
    return response;
  }

  async create(patientData:ICreateEmployeeDTO) {
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
  
}

export default EmployeeService;