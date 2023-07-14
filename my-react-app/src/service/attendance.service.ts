import { DefaultSuccessResponse } from 'types/backend.presenters';
import {
  CreateAttendanceDto, ListAttendanceQueryDto, PageDto, UpdateTechnicianAttendanceDto,
} from '../types/backend.dtos';
import { objectFieldsToString } from '../utils/object';
import api from './api';
import { AttendanceStatus, AttendanceType } from '../types/backend.enums';
import { IAttendance } from '@/types/backend.interfaces';

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

  async updateTechnicianInfo(attendanceId: string, data:UpdateTechnicianAttendanceDto) {
    const response = await api.put(`/attendances/${attendanceId}/technician-info`, data);

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

    return response.data as PageDto<IAttendance>;
  },

  async getOne(attendanceId:string) {
    const response = await api.get(`/attendances/${attendanceId}`);

    return response.data as DefaultSuccessResponse<IAttendance>;
  },
};

export default attendanceService;
