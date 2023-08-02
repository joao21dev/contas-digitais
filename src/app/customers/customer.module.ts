import { Module } from '@nestjs/common';
import usecases from './usecases';

@Module({
  providers: [...usecases],
  exports: [...usecases],
})
export class CustomerModule {}
