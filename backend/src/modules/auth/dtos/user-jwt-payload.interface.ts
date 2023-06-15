import { Role } from 'src/shared/enums/role.enum';

export interface UserJwtPayload {
  cpf: string;
  role: Role;
}
