import axios from 'axios';
import { CreateAttendanceDto, ListAttendanceQueryDto } from '../types/backend.dtos';
import { objectFieldsToString } from '../utils/object';
import api from './api';

const attendanceService = {
  async create(attendanceData:CreateAttendanceDto) {
    const response = await api.post('/attendances', attendanceData);

    return response.data;
  },
  async getAll(query:ListAttendanceQueryDto) {
    const o = { ...query };
    const objString = `?${(new URLSearchParams(objectFieldsToString(o))).toString()}`;

    const response = await api.get(`/attendances${objString}`);

    return response.data;
  },
};

export default attendanceService;
