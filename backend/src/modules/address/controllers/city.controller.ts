import { Controller, Get, Query } from '@nestjs/common';
import { GetCitiesQueryDTO } from '../dto/get-cities.dto';
import { CityService } from '../services/city.service';

@Controller('cities')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  findAll(@Query() getDto: GetCitiesQueryDTO) {
    return this.cityService.findAll(getDto);
  }
}
