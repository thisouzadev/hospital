import axios, {  } from 'axios';
import {  ICreateScheduleDto } from '../types/backend.interfaces';



const scheduleService = {
  async create(scheduleData:ICreateScheduleDto) {
    try {
      const response = await axios({
        method: 'post',
        url: 'http://localhost:3000/schedules',
        data: scheduleData,
      });
      return response.data;
      
    } catch (error: any) {
      return error.response?.data;
    }
  },
  async getAll() {
    try {
      const response = await axios({
        method: 'get',
        url: 'http://localhost:3000/schedules',
      
      });
      return response.data;
      
    } catch (error: any) {
      return error.response?.data;
    }
  },
}

export default scheduleService;