import axios from 'axios';
import { City, State } from 'types/backend.models';

const citiesService = {
  async getAllStates() {
    try {
      const response = await axios({
        method: 'get',
        url: 'http://localhost:3000/states',
      });
      return response.data as State[];
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
      return response.data as City[];
    } catch (error: any) {
      return error.response?.data;
    }
  },
};

export default citiesService;
