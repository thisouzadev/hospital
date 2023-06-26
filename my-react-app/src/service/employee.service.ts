import axios from 'axios';
import { CreateEmployeeDto } from '../types/backend.dtos';
import api from './api';

const EmployeeService = {
  async create(employeeData:CreateEmployeeDto) {
    const response = await api.post('/employees', employeeData);

    return response.data;
  },

  async getAll() {
    const response = await api.get('/employees');

    return response.data;
  },

  async delete(id: string) {
    const response = await api.delete(`/employees/${id}`);

    return response.data;
  },

  async getOne(employeeId: string) {
    const response = await api.get(`/employees/${employeeId}`);

    return response.data;
  },

  async update(employeeId: string, employeeData:any) {
    try {
      const response = await axios({
        method: 'put',
        url: `http://localhost:3000/employees/${employeeId}`,
        data: employeeData,
      });
      return response.data;
    } catch (error: any) {
      return error.response?.data;
    }
  },
};
export default EmployeeService;
