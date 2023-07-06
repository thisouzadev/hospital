import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Test } from '../entities/test.entity';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(Test)
    private readonly quickTestRepository: Repository<Test>,
  ) {}

  findAll(): Promise<Test[]> {
    return this.quickTestRepository.find();
  }
}
