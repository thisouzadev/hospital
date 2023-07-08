import { DataSource } from 'typeorm';
import 'dotenv/config';
import { TestCategory } from '../../modules/quick-test/entities/test-category.entity';
import { CreateTestCategoryDto } from '../../modules/quick-test/dtos/create-test-category.dto';

const createTests = async () => {
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

  const testsData: CreateTestCategoryDto[] = [
    {
      name: 'Teste DST padrão',
      description: '',
      isMultiple: true,
      testList: 'hiv, sífilis, hepatite B, hepatite C',
    },
  ];

  const tests = AppDataSource.getRepository(TestCategory).create(testsData);

  await AppDataSource.getRepository(TestCategory).save(tests);
  await AppDataSource.destroy();
};

createTests().then(() => console.log('tests created!'));
