import axios from 'axios';
import { ICreateEmployeeDTO } from '../types/backend.interfaces';

const EmployeeService = {
  async create(employeeData:ICreateEmployeeDTO) {
    try {
      const response = await axios({
        method: 'post',
        url: 'http://localhost:3000/employees',
        data: employeeData,
      });
      return response.data;
      
    } catch (error: any) {
      return error.response?.data;
    }
  },
  async getAll() {
    try {
      const response = await axios({
        method: 'get',
        url: 'http://localhost:3000/employees',
      
      });
      return response.data;
      
    } catch (error: any) {
      return error.response?.data;
    }
  },
}
export default EmployeeService;