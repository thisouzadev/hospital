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
  async getOne(employeeId: string) {
    try {
      const response = await axios({
        method: 'get',
        url: 'http://localhost:3000/patients/' +  employeeId,
      });
      return response.data;
      
    } catch (error: any) {
      return error.response?.data;
    }
  },
  async delete(employeeId: string) {
    try {
      const response = await axios({
        method: 'delete',
        url: 'http://localhost:3000/employees/'+ employeeId,
      
      });
      return response.data;
      
    } catch (error: any) {
      return error.response?.data;
    }
  },
}
export default EmployeeService;