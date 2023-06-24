import axios from 'axios';
import { CreateAttendanceDto, ListAttendanceQueryDto } from '../types/backend.dtos';
import { objectFieldsToString } from '../utils/object';

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

    console.log(objString);
    try {
      const response = await axios({
        method: 'get',
        url: `http://localhost:3000/attendances${objString}`,

      });
      return response.data;
    } catch (error: any) {
      return error.response?.data;
    }
  },
};

export default attendanceService;
