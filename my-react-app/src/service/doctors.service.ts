import { objectFieldsToString } from '../utils/object';
import { CreateDoctorScheduleDto, ListDoctorSchedulesQueryDto } from '../types/backend.dtos';
import api from './api';
import { Doctor } from '../types/backend.models';
import { DefaultSuccessResponse } from '../types/backend.presenters';

const doctorsService = {

  async getAll() {
    const response = await api.get('/doctors');

    return response.data as DefaultSuccessResponse<Doctor[]>;
  },

  async getSchedules(query : ListDoctorSchedulesQueryDto) {
    const o = { ...query };
    const objString = `?${(new URLSearchParams(objectFieldsToString(o))).toString()}`;
    const response = await api.get(`/doctor-schedules${objString}`);

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
