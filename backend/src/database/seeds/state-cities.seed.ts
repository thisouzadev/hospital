import { DataSource } from 'typeorm';
import 'dotenv/config';
import * as path from 'path';
import * as fs from 'fs';

import { State } from '../../modules/address/entities/state.entity';
import { City } from '../../modules/address/entities/city.entity';

const createCities = async () => {
  const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.MIGRATION_DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '/../../**/*.entity{.ts,.js}'], // Caminho para as entidades
  });

  await AppDataSource.initialize();

  const stateRepository = AppDataSource.getRepository(State);
  const cityRepository = AppDataSource.getRepository(City);

  console.log('starting states/cities seed');

  const stateSeedFile = path.resolve(__dirname, 'estados.csv');
  const citiesSeedFile = path.resolve(__dirname, 'municipios.csv');

  const stateFileContent = await fs.promises.readFile(stateSeedFile, {
    encoding: 'utf-8',
  });

  const citiesFileContent = await fs.promises.readFile(citiesSeedFile, {
    encoding: 'utf-8',
  });

  const stateSeed = stateFileContent.split('\n').map((line) => {
    const [id, name, abbreviation] = line.split(',');

    return {
      stateId: Number(id),
      name,
      abbreviation,
    };
  });

  const citiesSeed = citiesFileContent.split('\n').map((line, index) => {
    const [state_id, ibge_code, name] = line.split(',');

    return {
      cityId: index,
      stateId: Number(state_id),
      ibgeCode: Number(ibge_code),
      name,
    };
  });

  const dbStatesNumber = await stateRepository.count();

  if (dbStatesNumber !== stateSeed.length) {
    const states = stateSeed.map((state) => {
      return stateRepository.create(state);
    });

    await stateRepository.save(states);
    console.log(states.length + ' states seeded');
  } else {
    console.log('state already seeded');
  }

  const dbCitiesNumber = await cityRepository.count();

  if (dbCitiesNumber !== citiesSeed.length) {
    const cities = citiesSeed.map((city) => {
      return cityRepository.create(city);
    });
    // console.log(cities);
    await cityRepository.save(cities);
    console.log(cities.length + ' cities seeded');
  } else {
    console.log('cities already seeded');
  }

  await AppDataSource.destroy();
};

createCities().then(() => console.log('State and Cities seeding finished!'));
