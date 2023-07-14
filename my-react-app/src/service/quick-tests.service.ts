import { CreateQuickTestDto, ListQuickTestsQueryDto, PageDto } from '../types/backend.dtos';
import api from './api';
import { DefaultSuccessResponse } from '../types/backend.presenters';
import { objectFieldsToString } from '../utils/object';
import { IQuickTest, ITestCategory } from '@/types/backend.interfaces';

const quickTestService = {

  async getAllCategories() {
    const response = await api.get('/test-categories');

    return response.data as DefaultSuccessResponse<ITestCategory[]>;
  },

  async getAllQuickTests(query?: ListQuickTestsQueryDto) {
    const o = { ...query };
    const objString = `?${(new URLSearchParams(objectFieldsToString(o))).toString()}`;

    const response = await api.get(`/quick-tests${objString}`);

    return response.data as PageDto<IQuickTest>;
  },

  async create(data:CreateQuickTestDto) {
    const response = await api.post('/quick-tests', data);

    return response.data as DefaultSuccessResponse<IQuickTest>;
  },

};

export default quickTestService;
