import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseProvider {
  dataSource: DataSource;
  constructor() {
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
