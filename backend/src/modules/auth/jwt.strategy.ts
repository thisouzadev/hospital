import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { Funcionario } from '../funcionario/entities/funcionario.entity';
import { UserJwtPayload } from './dtos/user-jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Funcionario)
    private readonly funcionarioRepository: Repository<Funcionario>,

    private configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: UserJwtPayload): Promise<Funcionario> {
    const { cpf } = payload;
    const user: Funcionario = await this.funcionarioRepository.findOne({
      where: { cpf },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
