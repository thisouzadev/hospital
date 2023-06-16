import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateFuncionarioDto } from '../dtos/create-funcionario.dto';
import { Funcionario } from '../entities/funcionario.entity';
import { FuncionarioService } from '../services/funcionario.service';
import { UpdateFuncionarioDto } from '../dtos/update-funcionario.dto';

@Controller('funcionarios')
export class FuncionarioController {
  constructor(private readonly funcionarioService: FuncionarioService) {}

  @Post()
  create(@Body() funcionarioDto: CreateFuncionarioDto): Promise<Funcionario> {
    return this.funcionarioService.create(funcionarioDto);
  }

  @Get()
  findAll(): Promise<Funcionario[]> {
    return this.funcionarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Funcionario> {
    return this.funcionarioService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() funcionarioDto: UpdateFuncionarioDto,
  ): Promise<Funcionario> {
    return this.funcionarioService.update(id, funcionarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.funcionarioService.remove(Number(id));
  }
}
