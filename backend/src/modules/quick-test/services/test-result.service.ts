import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageMetaDto } from '../../../shared/dtos/page-meta.dto';
import { PageDto } from '../../../shared/dtos/page.dto';
import { Between, Repository } from 'typeorm';

import { QuickTest } from '../entities/quick-test.entity';
import { CreateQuickTestDto } from '../dtos/create-quick-test.dto';
import { ListQuickTestsQueryDto } from '../dtos/list-quick-tests-query.dto';

@Injectable()
export class QuickTestService {
  constructor(
    @InjectRepository(QuickTest)
    private readonly testRepository: Repository<QuickTest>,
  ) {}

  async create(responsibleId: string, createTestResultDto: CreateQuickTestDto) {
    const result = this.testRepository.create({
      ...createTestResultDto,
      responsibleId,
    });
    await this.testRepository.save(result);
    return result;
  }

  async findAll(query: ListQuickTestsQueryDto) {
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
      relations: ['category'],
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
