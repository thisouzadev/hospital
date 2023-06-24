import axios from 'axios';
import { AuthReturnDto } from '../types/backend.dtos';

const AuthService = {
  login: async (email: string, password: string) => {
    try {
      const response = await axios({
        method: 'post',
        url: 'http://localhost:3000/auth/signin',
        data: {
          email,
          password,
        },
      });
      return response.data as AuthReturnDto;
    } catch (error: any) {
      return error.response?.data;
    }
  },
};

export default AuthService;
