import api from './api';

const doctorsService = {

  async getAll() {
    const response = await api.get('/doctors');

    return response.data;
  },

  async removeSchedule(id: string) {
    const response = await api.delete(`/doctor-schedules/${id}`);

    return response.data;
  },

};

export default doctorsService;
