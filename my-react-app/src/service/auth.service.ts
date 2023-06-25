import api from './api';

const AuthService = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/signin', {
      email,
      password,
    });

    return response?.data;
  },
};

export default AuthService;
