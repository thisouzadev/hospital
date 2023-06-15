import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Funcionario } from '../funcionario/entities/funcionario.entity';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dtos/user-auth-credentials.dto';
import { UserJwtPayload } from './dtos/user-jwt-payload.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Funcionario)
    private readonly funcionarioRepository: Repository<Funcionario>,
  ) {}

  async signin(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const cpf: string = authCredentialsDto.cpf;
    const senha: string = authCredentialsDto.senha;

    const user = await this.funcionarioRepository.findOne({
      where: { cpf },
    });

    if (user) {
      const senhaMatches = await bcrypt.compare(senha, user.senha);

      if (!senhaMatches) {
        throw new UnauthorizedException('cpf/senha inválidos!');
      }

      const role = user.role;
      const payload: UserJwtPayload = { cpf, role };
      const accessToken: string = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('cpf/senha inválidos!');
    }
  }
}
