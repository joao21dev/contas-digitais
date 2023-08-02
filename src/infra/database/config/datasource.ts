import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import entities from '@domain/entities';
config();

export default new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  entities: [...entities],
  migrations: ['dist/infra/database/migrations/*{.ts,.js}'],
});
