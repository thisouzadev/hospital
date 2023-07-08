import { CreateSectorDto } from '../types/backend.dtos';
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

};

export default sectorService;
