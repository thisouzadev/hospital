import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { GetCitiesQueryDTO } from '../dto/get-cities.dto';
import { City } from '../entities/city.entity';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private readonly CityRepository: Repository<City>,
  ) {}

  findAll(findDto: GetCitiesQueryDTO) {
    return this.CityRepository.find({
      where: {
        stateId: findDto.stateId,
        name: Like(`${findDto.partialName || ''}%`),
      },
    });
  }
}
