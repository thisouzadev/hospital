import api from './api';

const doctorsService = {

  async getAll() {
    const response = await api.get('/doctors');

    return response.data;
  },

};

export default doctorsService;
