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
    const funcionario = this.funcionarioRepository.create({
      ...funcionarioDto,
    });

    return this.funcionarioRepository.save(funcionario);
  }

  findAll(): Promise<Funcionario[]> {
    return this.funcionarioRepository.find({ relations: ['hospital'] });
  }

  findOne(id: string): Promise<Funcionario> {
    return this.funcionarioRepository.findOne({ where: { funcionarioID: id } });
  }

  async update(
    id: string,
    funcionarioDto: UpdateFuncionarioDto,
  ): Promise<Funcionario> {
    await this.funcionarioRepository.update(id, {
      ...funcionarioDto,
    });

    return this.funcionarioRepository.findOne({ where: { funcionarioID: id } });
  }

  async remove(id: number): Promise<void> {
    await this.funcionarioRepository.delete(id);
  }
}
