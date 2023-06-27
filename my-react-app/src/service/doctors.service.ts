import { CreateDoctorScheduleDto } from '../types/backend.dtos';
import api from './api';

const doctorsService = {

  async getAll() {
    const response = await api.get('/doctors');

    return response.data;
  },

  async createSchedule(data:CreateDoctorScheduleDto) {
    const response = await api.post('/doctor-schedules', data);

    return response.data;
  },

  async updateSchedule(id:string, data:CreateDoctorScheduleDto) {
    const response = await api.put(`/doctor-schedules/${id}`, data);

    return response.data;
  },

  async removeSchedule(id: string) {
    const response = await api.delete(`/doctor-schedules/${id}`);

    return response.data;
  },

};

export default doctorsService;
