import { DefaultSuccessResponse } from 'types/backend.presenters';
import { Attendance } from '../types/backend.models';
import { CreateAttendanceDto, ListAttendanceQueryDto, PageDto } from '../types/backend.dtos';
import { objectFieldsToString } from '../utils/object';
import api from './api';
import { AttendanceStatus, AttendanceType } from '../types/backend.enums';

const attendanceService = {
  async create(attendanceData:CreateAttendanceDto) {
    const response = await api.post('/attendances', attendanceData);

    return response.data;
  },
  async updateStatus(
    { attendanceId, status, type }:{
      attendanceId: string, status?: AttendanceStatus, type?: AttendanceType },
  ) {
    const response = await api.patch(`/attendances/${attendanceId}/status`, { status, type });

    return response.data;
  },

  async finish(attendanceId:string) {
    const response = await api.patch(`/attendances/${attendanceId}/finish`);

    return response.data as DefaultSuccessResponse<undefined>;
  },

  async getAll(query:ListAttendanceQueryDto) {
    const o = { ...query };
    const objString = `?${(new URLSearchParams(objectFieldsToString(o))).toString()}`;

    const response = await api.get(`/attendances${objString}`);

    return response.data as PageDto<Attendance>;
  },

  async getOne(attendanceId:string) {
    const response = await api.get(`/attendances/${attendanceId}`);

    return response.data as DefaultSuccessResponse<Attendance>;
  },
};

export default attendanceService;
