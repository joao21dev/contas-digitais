import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { dataSource } from '../config/database.config';

@Injectable()
export class DatabaseProvider {
  dataSource: DataSource;
  constructor() {
    this.dataSource = dataSource();
    this.dataSource
      .initialize()
      .then(() => {
        console.log('Data Source has been initialized!');
        return this.dataSource;
      })
      .catch((err) => {
        console.error('Error during Data Source initialization', err);
      });
  }

  getConnection() {
    return this.dataSource;
  }
}
