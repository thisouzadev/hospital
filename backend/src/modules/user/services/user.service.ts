import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(userDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create({
      ...userDto,
    });

    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(userId: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ userId });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return user;
  }

  async update(userId: string, userDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOneBy({ userId });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    Object.assign(user, userDto);

    this.userRepository.save(user);

    return user;
  }

  async remove(userId: string): Promise<void> {
    const user = await this.userRepository.findOneBy({ userId });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    await this.userRepository.remove(user);
  }
}
