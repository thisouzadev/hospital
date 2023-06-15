import axios from 'axios';

class UserService {
  async login(cpf: string, senha: string) {
    const response = await axios({
      method: 'post',
      url: 'http://localhost:3000/auth/signin',
      data: {
        cpf,
        senha,
      },
    });
    return response;
  }}

export default UserService;