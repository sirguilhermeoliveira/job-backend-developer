import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const TypeormDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION as 'mysql',
  host: process.env.TYPEORM_HOST,
  port: parseInt(process.env.TYPEORM_PORT, 10),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  migrations: [__dirname + '../../../../migrations/*{.ts,.js}'],
  synchronize: false,
});

export default TypeormDataSource;
