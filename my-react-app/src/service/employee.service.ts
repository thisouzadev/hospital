import axios from 'axios';

class EmployeeService {
  async getAllEmployee() {
    const response = await axios({
      method: 'get',
      url: 'http://localhost:3000/employees',
      data: {},
    });
    return response;
  }

  async deletedEmployee(id: string) {
    const response = await axios({
      method: 'del',
      url: `http://localhost:3000/employees/${id}`,
      data: {},
    });
    return response;
  }
}

export default EmployeeService;