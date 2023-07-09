import { CreateSectorDto, MoveSectorDto, SectorAttendanceDto } from '../types/backend.dtos';
import api from './api';
import { Sector } from '../types/backend.models';
import { DefaultSuccessResponse } from '../types/backend.presenters';

const sectorService = {

  async getAll() {
    const response = await api.get('/sectors');

    return response.data as DefaultSuccessResponse<Sector[]>;
  },

  async create(data:CreateSectorDto) {
    const response = await api.post('/sectors', data);

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
