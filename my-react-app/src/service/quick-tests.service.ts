import { CreateQuickTestDto, ListQuickTestsQueryDto, PageDto } from '../types/backend.dtos';
import api from './api';
import { QuickTest, TestCategory } from '../types/backend.models';
import { DefaultSuccessResponse } from '../types/backend.presenters';
import { objectFieldsToString } from '../utils/object';

const quickTestService = {

  async getAllCategories() {
    const response = await api.get('/test-categories');

    return response.data as DefaultSuccessResponse<TestCategory[]>;
  },

  async getAllQuickTests(query?: ListQuickTestsQueryDto) {
    const o = { ...query };
    const objString = `?${(new URLSearchParams(objectFieldsToString(o))).toString()}`;

    const response = await api.get(`/quick-tests${objString}`);

    return response.data as PageDto<QuickTest>;
  },

  async create(data:CreateQuickTestDto) {
    const response = await api.post('/quick-tests', data);

    return response.data;
  },

};

export default quickTestService;
