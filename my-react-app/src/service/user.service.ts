import axios from 'axios';

class UserService {
  async login(cpf: string, password: string) {
    const response = await axios({
      method: 'post',
      url: 'http://localhost:3000/auth/signin',
      data: {
        cpf,
        password,
      },
    });
    return response;
  }}

export default UserService;