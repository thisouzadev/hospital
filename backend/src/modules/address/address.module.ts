import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityController } from './controllers/city.controller';
import { StateController } from './controllers/state.controller';

import { Address } from './entities/address.entity';
import { City } from './entities/city.entity';
import { State } from './entities/state.entity';
import { CityService } from './services/city.service';
import { StateService } from './services/state.service';

@Module({
  imports: [TypeOrmModule.forFeature([Address, City, State])],
  providers: [CityService, StateService],
  controllers: [CityController, StateController],
  exports: [TypeOrmModule],
})
export class AddressModule {}
