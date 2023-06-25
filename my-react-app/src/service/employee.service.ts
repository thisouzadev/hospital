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
};
export default EmployeeService;
