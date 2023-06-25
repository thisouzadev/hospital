import axios from 'axios';
import { CreateAttendanceDto, ListAttendanceQueryDto } from '../types/backend.dtos';
import { objectFieldsToString } from '../utils/object';
import api from './api';

const attendanceService = {
  async create(attendanceData:CreateAttendanceDto) {
    try {
      const response = await axios({
        method: 'post',
        url: 'http://localhost:3000/attendances',
        data: attendanceData,
      });
      return response.data;
    } catch (error: any) {
      return error.response?.data;
    }
  },
  async getAll(query:ListAttendanceQueryDto) {
    const o = { ...query };
    const objString = `?${(new URLSearchParams(objectFieldsToString(o))).toString()}`;
    const response = await api.get(`/attendances${objString}`);

    return response.data;
  },
};

export default attendanceService;
