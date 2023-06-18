import { DataSource } from 'typeorm';
import 'dotenv/config';
import { User, UserRole } from '../../modules/user/entities/user.entity';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

const createSuperAdmin = async () => {
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
  // const a = await AppDataSource.createQueryRunner().query(
  //   `select * from hospitais`,
  // );

  // console.log(a);

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash('123456', saltRounds);

  class superAdminData implements CreateUserDto {
    role: UserRole;
    email: string;
    password: string;
    constructor() {
      this.role = UserRole.SuperAdmin;
      this.email = 'super_admin@email.com';
      this.password = hashedPassword;
    }
  }

  let superAdmin = await AppDataSource.getRepository(User).findOneBy({
    role: UserRole.SuperAdmin,
  });
  if (!superAdmin) {
    superAdmin = await AppDataSource.getRepository(User).create(
      new superAdminData(),
    );
  } else {
    Object.assign(superAdmin, new superAdminData());
  }
  await AppDataSource.getRepository(User).save(superAdmin);
  await AppDataSource.destroy();
};

createSuperAdmin().then(() => console.log('SuperAdmin created!'));
