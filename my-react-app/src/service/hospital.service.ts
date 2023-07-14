import { CreateHospitalDto, UpdateHospitalDto } from '../types/backend.dtos';
import api from './api';
import { Hospital } from '../types/backend.models';
import { DefaultSuccessResponse } from '../types/backend.presenters';

const hospitalService = {

  async getAll() {
    const response = await api.get('/hospitals');

    return response.data as DefaultSuccessResponse<Hospital[]>;
  },

  async create(data:CreateHospitalDto) {
    const response = await api.post('/hospitals', data);

    return response.data;
  },

  async update({ sectorId, data }:{ sectorId:string, data:UpdateHospitalDto }) {
    const response = await api.put(`/hospitals/${sectorId}`, data);

    return response.data;
  },

  async delete(sectorId: string) {
    const response = await api.delete(`/hospitals/${sectorId}`);

    return response.data;
  },

};

export default hospitalService;