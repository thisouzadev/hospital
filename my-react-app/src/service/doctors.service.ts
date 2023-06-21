import axios, {  } from 'axios';

const doctorsService = {

  async getAll() {
    try {
      const response = await axios({
        method: 'get',
        url: 'http://localhost:3000/doctors',
      });
      return response.data;
      
    } catch (error: any) {
      return error.response?.data;
    }
  }
}

export default doctorsService;