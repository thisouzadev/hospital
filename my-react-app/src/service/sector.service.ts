import { CreateSectorDto, MoveSectorDto, SectorAttendanceDto } from '../types/backend.dtos';
import api from './api';
import { DefaultSuccessResponse } from '../types/backend.presenters';
import { ISector } from '@/types/backend.interfaces';

const sectorService = {

  async getAll() {
    const response = await api.get('/sectors');

    return response.data as DefaultSuccessResponse<ISector[]>;
  },

  async create(data:CreateSectorDto) {
    const response = await api.post('/sectors', data);

    return response.data;
  },

  async update({ sectorId, data }:{ sectorId:string, data:CreateSectorDto }) {
    const response = await api.put(`/sectors/${sectorId}`, data);

    return response.data;
  },

  async delete(sectorId: string) {
    const response = await api.delete(`/sectors/${sectorId}`);

    return response.data;
  },

  async enterSector(data:SectorAttendanceDto) {
    const response = await api.post('/sector-attendances/enter', data);

    return response.data;
  },

  async leftSector(data:SectorAttendanceDto) {
    const response = await api.post('/sector-attendances/left', data);

    return response.data;
  },

  async moveSector(data:MoveSectorDto) {
    const response = await api.post('/sector-attendances/move', data);

    return response.data;
  },

};

export default sectorService;
