import { AccountsRepository } from '@app/accounts/repositories/account.repository';
import { CustomersRepository } from '@app/customers/repositories/customers.repository';
import { TransactionRepository } from '@app/transaction/repositories/transactions.repository';
import entities from '@domain/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './config/database.config';
import { PostgresAccountsRepository } from './postgres/accounts.repository';
import { PostgresTransactionsRepository } from './postgres/transactions.repository';
import { PostgresCustomersRepository } from './postgres/customers.repository';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return { ...databaseConfig() };
      },
    }),
    TypeOrmModule.forFeature([...entities]),
  ],
  providers: [
    {
      provide: CustomersRepository,
      useClass: PostgresCustomersRepository,
    },
    {
      provide: AccountsRepository,
      useClass: PostgresAccountsRepository,
    },
    {
      provide: TransactionRepository,
      useClass: PostgresTransactionsRepository,
    },
  ],
  exports: [CustomersRepository, AccountsRepository, TransactionRepository],
})
export class DatabaseModule {}
