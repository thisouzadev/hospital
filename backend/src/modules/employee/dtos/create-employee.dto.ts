import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';

export class CreateEmployeeDto {
  name: string;
  cpf: string;
  rg: string;
  cargo: string;
  especialidade: string;
  user: CreateUserDto;
}
