import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(UserDto: CreateUserDto): Promise<User> {
    const { password } = UserDto;
    const saltRounds = 10;
    const hashedSenha = await bcrypt.hash(password, saltRounds);

    const User = this.userRepository.create({
      ...UserDto,
      password: hashedSenha,
    });

    return this.userRepository.save(User);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(userId: string): Promise<User> {
    return this.userRepository.findOneBy({ userId });
  }

  async update(id: string, UserDto: UpdateUserDto): Promise<User> {
    const { password } = UserDto;
    const saltRounds = 10;
    const hashedSenha = await bcrypt.hash(password, saltRounds);

    await this.userRepository.update(id, {
      ...UserDto,
      password: hashedSenha,
    });

    return this.userRepository.findOne({ where: { userId: id } });
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
