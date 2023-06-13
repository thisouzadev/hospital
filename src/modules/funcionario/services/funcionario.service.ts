import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Funcionario } from '../entities/funcionario.entity';
import { UpdateFuncionarioDto } from '../dtos/update-funcionario.dto';
import { CreateFuncionarioDto } from '../dtos/create-funcionario.dto';

@Injectable()
export class FuncionarioService {
  constructor(
    @InjectRepository(Funcionario)
    private readonly funcionarioRepository: Repository<Funcionario>,
  ) {}

  async create(funcionarioDto: CreateFuncionarioDto): Promise<Funcionario> {
    const { senha } = funcionarioDto;
    const saltRounds = 10;
    const hashedSenha = await bcrypt.hash(senha, saltRounds);

    const funcionario = this.funcionarioRepository.create({
      ...funcionarioDto,
      senha: hashedSenha,
    });

    return this.funcionarioRepository.save(funcionario);
  }

  findAll(): Promise<Funcionario[]> {
    return this.funcionarioRepository.find({ relations: ['hospital'] });
  }

  findOne(id: number): Promise<Funcionario> {
    return this.funcionarioRepository.findOne({ where: { funcionarioID: id } });
  }

  async update(
    id: number,
    funcionarioDto: UpdateFuncionarioDto,
  ): Promise<Funcionario> {
    const { senha } = funcionarioDto;
    const saltRounds = 10;
    const hashedSenha = await bcrypt.hash(senha, saltRounds);

    await this.funcionarioRepository.update(id, {
      ...funcionarioDto,
      senha: hashedSenha,
    });

    return this.funcionarioRepository.findOne({ where: { funcionarioID: id } });
  }

  async remove(id: number): Promise<void> {
    await this.funcionarioRepository.delete(id);
  }
}
