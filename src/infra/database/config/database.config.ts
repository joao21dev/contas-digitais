import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import entities from '@domain/entities';
config();

export default (): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> => ({
  type: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  entities: [...entities],
  // synchronize: true,
});

export const dataSource = () => {
  return new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  });
};
