import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageMetaDto } from '../../../shared/dtos/page-meta.dto';
import { PageDto } from '../../../shared/dtos/page.dto';
import { Between, Repository } from 'typeorm';
import { CreateTestResultDto } from '../dtos/create-test-result.dto';
import { ListTestResultsQueryDto } from '../dtos/list-test-results-query.dto';
import { TestResult } from '../entities/test-result.entity';

@Injectable()
export class TestResultService {
  constructor(
    @InjectRepository(TestResult)
    private readonly testRepository: Repository<TestResult>,
  ) {}

  async create(
    responsibleId: string,
    createTestResultDto: CreateTestResultDto,
  ) {
    const result = this.testRepository.create({
      ...createTestResultDto,
      responsibleId,
    });
    await this.testRepository.save(result);
    return result;
  }

  async findAll(query: ListTestResultsQueryDto) {
    const { patientId, date, startDate, endDate, responsibleId } = query;
    const { take, page } = query;
    const skip = query.getSkip();
    const { orderBy, orderType } = query;

    const minDate = date || startDate || '1900-01-01';
    const maxDate = date || endDate || '2099-12-31';

    const [entities, itemCount] = await this.testRepository.findAndCount({
      where: {
        date: Between(minDate, maxDate),
        responsibleId,
        patientId,
      },
      take,
      skip,
      relations: ['test'],
      order: {
        // status: 'DESC',
        [orderBy]: orderType,
        createdAt: 'ASC',
      },
    });

    const pageMetaDto = new PageMetaDto({
      pageOptionsDto: { take, page },
      itemCount,
    });

    return new PageDto(entities, pageMetaDto);
  }
}
