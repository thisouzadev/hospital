import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Funcionario } from 'src/modules/funcionario/entities/funcionario.entity';
import { CreateSessionDto } from '../dtos/createSession.dto';
import { sign } from 'jsonwebtoken';
import { authConfig } from 'src/config/auth';

export interface CreateSessionResponse {
  funcionario: Funcionario;
  token: string;
}

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Funcionario)
    private readonly funcionarioRepository: Repository<Funcionario>,
  ) {}

  async create(sessionDto: CreateSessionDto): Promise<CreateSessionResponse> {
    const { senha, cpf } = sessionDto;

    const funcionarioExists = await this.funcionarioRepository.findOne({
      where: { cpf },
    });

    if (!funcionarioExists) {
      // aqui nós não informamos que o cpf não existe para
      // não dar informações sobre nosso banco a usuários não autenticados
      throw new Error('Combinação cpf/senha inválidos');
    }

    const senhaMatches = await bcrypt.compare(senha, funcionarioExists.senha);

    if (!senhaMatches) {
      throw new Error('Combinação cpf/senha inválidos');
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: String(funcionarioExists.funcionarioID),
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      funcionario: funcionarioExists,
      token,
    };
  }
}
