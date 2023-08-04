import { Module } from '@nestjs/common';
import usecases from './usecases';
import { DatabaseModule } from '@infra/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...usecases],
  exports: [...usecases],
})
export class AccountModule {}
