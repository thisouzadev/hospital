import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TestCategory } from '../entities/test-category.entity';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(TestCategory)
    private readonly quickTestRepository: Repository<TestCategory>,
  ) {}

  findAll(): Promise<TestCategory[]> {
    return this.quickTestRepository.find();
  }
}
