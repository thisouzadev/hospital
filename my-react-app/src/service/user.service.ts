import axios from 'axios';

class UserService {
  async login(email: string, password: string) {
    const response = await axios({
      method: 'post',
      url: 'http://localhost:3000/auth/signin',
      data: {
        email,
        password,
      },
    });
    return response;
  }
}

export default UserService;
