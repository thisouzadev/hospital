import { ICreateDoctorDto } from './create-doctor.interface';
import { ICreateAddressDto } from './create-address.interface';
import { ICreateUserDto } from './create-user.interface';

export interface ICreateEmployeeDTO {
  name: string;

  hospitalId: string;

  cpf: string;

  rg: string;

  user: ICreateUserDto;

  address: ICreateAddressDto;

  doctor?: ICreateDoctorDto;
}
