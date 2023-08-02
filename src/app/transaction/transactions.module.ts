import { Module } from '@nestjs/common';
import { DatabaseModule } from '@infra/database/database.module';
import usecases from './usecases';

@Module({
  imports: [DatabaseModule],
  providers: [...usecases],
  exports: [...usecases],
})
export class TransactionModule {}
