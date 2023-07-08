import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../../modules/user/entities/user.entity';

export const UserHospital = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: User = request.user;

    if (!user) {
      throw new UnauthorizedException(
        'Dados do usuário não encontrados na requisição',
      );
    }

    const hospitalId = user.employee.hospitalId;

    if (!hospitalId) {
      throw new UnauthorizedException(
        'O usuário não possui um Hospital associado',
      );
    }
    return hospitalId;
  },
);
