import { Attendance } from '../types/backend.models';
import { CreateAttendanceDto, ListAttendanceQueryDto, PageDto } from '../types/backend.dtos';
import { objectFieldsToString } from '../utils/object';
import api from './api';
import { AttendanceStatus } from '../types/backend.enums';

const attendanceService = {
  async create(attendanceData:CreateAttendanceDto) {
    const response = await api.post('/attendances', attendanceData);

    return response.data;
  },
  async updateStatus({ attendanceId, status }:{ attendanceId: string, status: AttendanceStatus }) {
    const response = await api.patch(`/attendances/${attendanceId}/status`, { status });

    return response.data;
  },
  async getAll(query:ListAttendanceQueryDto) {
    const o = { ...query };
    const objString = `?${(new URLSearchParams(objectFieldsToString(o))).toString()}`;

    const response = await api.get(`/attendances${objString}`);

    return response.data as PageDto<Attendance>;
  },
};

export default attendanceService;
