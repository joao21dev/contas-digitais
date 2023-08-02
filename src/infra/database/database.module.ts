import entities from '@domain/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './config/database.config';
import { DatabaseProvider } from './providers/database.provider';
import { CustomersRepository } from '@app/customers/repositories/customers.repository';
import { MySqlCustomersRepository } from './mysql/customer.repository';
import { AccountsRepository } from '@app/accounts/repositories/account.repository';
import { MySqlAccountsRepository } from './mysql/accounts.repository';
import { TransactionRepository } from '@app/transaction/repositories/transactions.repository';
import { MySqlTransactionsRepository } from './mysql/transactions.repository';

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
    DatabaseProvider,
    {
      provide: CustomersRepository,
      useClass: MySqlCustomersRepository,
    },
    {
      provide: AccountsRepository,
      useClass: MySqlAccountsRepository,
    },
    {
      provide: TransactionRepository,
      useClass: MySqlTransactionsRepository,
    },
  ],
  exports: [CustomersRepository, AccountsRepository, TransactionRepository],
})
export class DatabaseModule {}
