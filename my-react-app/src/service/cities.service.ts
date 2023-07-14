import axios from 'axios';
import { ICity, IState } from '@/types/backend.interfaces';

const citiesService = {
  async getAllStates() {
    try {
      const response = await axios({
        method: 'get',
        url: 'http://localhost:3000/states',
      });
      return response.data as IState[];
    } catch (error: any) {
      return error.response?.data;
    }
  },
  async getCities(stateId:number) {
    try {
      const response = await axios({
        method: 'get',
        url: `http://localhost:3000/cities?stateId=${stateId}`,
      });
      return response.data as ICity[];
    } catch (error: any) {
      return error.response?.data;
    }
  },
};

export default citiesService;
